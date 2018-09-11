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

  render() {
    return (
      <div className="container">
          <List listLocations={locations}
                togglePopup={this.changeLocation.bind(this)}
                filterMap={this.filterMap.bind(this)}>
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
