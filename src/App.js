import React, { Component } from 'react';
import locations from './Map-Locations.json'
import MapContainer from './Map'
import List from './List'
import './App.css';

let filtered = false;

class App extends Component {
  state = {
    popupLocation: '', // Stores the clicked location from the list
    markerLocation: 'all' // Stores the chosen location from select menu
  }

  // Get the location from the list to use it in map
  changeLocation(name) {
    // Show the popup if hidden and hide it if shown
    if(this.state.popupLocation === '' || this.state.popupLocation !== name)
      this.setState({ popupLocation: name})
    else if(this.state.popupLocation === name)
      this.setState({ popupLocation: ''})
  }

  // Filter map if filter button is clicked
  filterMap(location) {
    this.setState({markerLocation: location})
    filtered = true
  }

  // On filtering, close all the opened popups
  hideAllPopups() {
    this.setState({popupLocation: ''})
    this.doneFiltering()
  }

  // Return value of filtered to false after filtering
  doneFiltering() {
    filtered = false
  }

  // Open or Close the menu and adjust focus
  addAllCloseClasses() {
    const list = document.getElementById('list'),
          listIcon = document.querySelector('.list-icon'),
          listContainer = document.querySelector('.list-container')

    // Add classes that hides the menu offscreen
    list.classList.toggle('close-list')
    listIcon.classList.toggle('close-list-icon')

    if(list.classList.contains('close-list')) {
      // Remove focus from select element
      listContainer.children[1][0].setAttribute('tabindex', '-1')

      // Remove focus from filter button
      listContainer.children[1][1].setAttribute('tabindex', '-1')
  
      // Remove focus from each list item
      let listItems = [].slice.call(listContainer.children[2].children)
      listItems.forEach(item => {
        item.setAttribute('tabindex', '-1')
      });
    }
    else {
      // Return focus to select element
      listContainer.children[1][0].setAttribute('tabindex', '0')

      // Return focus to filter button
      listContainer.children[1][1].setAttribute('tabindex', '0')
  
      // Return focus to each list item
      let listItems = [].slice.call(listContainer.children[2].children)
      listItems.forEach(item => {
        item.setAttribute('tabindex', '0')
      });
    }
  }

  render() {
    return (
      <div className="container">
          <List listLocations={locations}
                togglePopup={this.changeLocation.bind(this)}
                filterMap={this.filterMap.bind(this)}
                closeMenu={this.addAllCloseClasses}>
          </List>

          <MapContainer mapLocations={locations}
                        clickedLocation={this.state.popupLocation}
                        chosenLocation={this.state.markerLocation}
                        filtered={filtered}
                        hideAllPopups={this.hideAllPopups.bind(this)}/>
      </div>
    );
  }
}

export default App;
