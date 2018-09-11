import React, {Component} from 'react'
import scriptLoader from 'react-async-script-loader'

let map,
    descriptionResults = [],
    markers = [],
    popups = [];

export class MapContainer extends Component {
    state = {
        popupOpened: false, // Checker for any opened popup window
        markerOpened: '' // Stores the marker of the opened popup
    }

    componentWillReceiveProps({isScriptLoadSucceed}){
        if (isScriptLoadSucceed) {
            this.initMap()
        }
        else{
            alert("Google Maps couldn't be loaded")
        }
    }

    componentDidMount() {
        this.getLocationsDescription()
    }

    componentDidUpdate() {
        this.showClickedLocationPopup(this.props.clickedLocation)
    }

    initMap() {
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 27.318739, lng: 29.200092},
            zoom: 5.5
        });

        this.createMarkersWithPopups()
    }

    createMarkersWithPopups() {
        this.props.mapLocations.forEach(location => {

            let marker = new window.google.maps.Marker({
                position: {lat: location.latLng[0], lng: location.latLng[1]},
                map: map
            })

            markers.push({id: location.name, marker: marker, element: marker._element})

            let popup = new window.google.maps.InfoWindow()

            this.addTextToPopup(popup, location)

            popups.push({id: location.name, popup: popup})

            marker.addListener('click', () => {
                if(this.state.popupOpened === false) { // No popup is opened
                    this.openPopup(marker, popup)
                    this.setState({popupOpened: true, markerOpened: marker})
                }
                else {
                    if(this.state.markerOpened === marker) { // If the same marker is clicked again, close the popup
                        this.closeAllPopups()
                        this.setState({popupOpened: false, markerOpened: ''})
                    }
                    else { // If another marker is clicked while a popup is opened, close the old popup and open the new one
                        this.closeAllPopups()
                        this.openPopup(marker, popup)
                        this.setState({popupOpened: true, markerOpened: marker})
                    }
                }
                
            })
        })
    }

    showClickedLocationPopup(locationName) {
        if(this.props.filtered) {
            this.closeAllPopups()
        }

        for(let i = 0; i < popups.length; i++) {
            if(popups[i].id === locationName) {
                this.openPopup(markers[i].marker, popups[i].popup)              
            }
        }
    }

    // Open the popup with bounce animation
    openPopup(marker, popup) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE) // Add bounce animation on click
        setTimeout(() => {marker.setAnimation(null)}, 100) // Remove animation
        popup.open(map, marker)
    }

    closeAllPopups() {
        popups.forEach(popupData => {
            popupData.popup.close()
        })
    }

    addTextToPopup(popup, location) {
        Promise.all(descriptionResults).then(results => {
            results.forEach(data => {
                // Take only the description that has the same id as the location
                if(data.hasOwnProperty('id') && data.id === location.id) {
                    popup.setContent(`
                    <div class="popup-container">
                        <img class="popup-image" src=${location.imageSrc} alt=${location.name}/>
                        <h3>${location.name}</h3>
                        <p id="description">${data.description}</p>
                        <p id="attribution"><a href="https://www.mediawiki.org/wiki/API:Main_page" target="_blank">Wikimedia API</a></p>
                    </div>
                    `)
                }
                // In case of error in fetching the description from API
                if(!data.hasOwnProperty('id')) {
                    popup.setContent(`
                        <div class="popup-container">
                            <p>${data}</p>
                        </div>
                    `)
                }
            })
        })
    }

    getLocationsDescription() {
        const locations = this.props.mapLocations;

        locations.forEach((location, index) => {
            let site = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${location.urlSearchTerm}&limit=1&namespace=0&format=json&origin=*`;

            // Store an id property for every location to match its description
            location.id = index

            descriptionResults.push(this.fetchAsync(site, location))
        })
        
        return descriptionResults
    }

    // https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808
    async fetchAsync(site, location) {
        let data, result;
        // await response of fetch call
        let response = await fetch(site).catch(err => alert(err + ' ' + location.name + ' description'));
        
        if(response !== undefined) {
            // only proceed once promise is resolved
            data = await response.json();
            // only proceed once second promise is resolved
            result = {id: location.id, description: data[2][0]}
        }
        // In case of error in fetching data
        else {
            result = 'Failed to fetch description of the place'
        }

        return result;
    }

    render() {
        return (
            <div id="map" role="application"></div>
        );
    }
}

export default scriptLoader(
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyBsjpj_qNuY2VIY3yxAvEX_iglcEm0yB9Q'
)(MapContainer)

