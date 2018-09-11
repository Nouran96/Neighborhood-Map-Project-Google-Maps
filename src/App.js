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

  render() {
    return (
      <div className="container">
          <List listLocations={locations}
                togglePopup={this.changeLocation.bind(this)}>
          </List>

          <MapContainer mapLocations={locations}
                        clickedLocation={this.state.popupLocation}
                        filtered={filtered}/>
      </div>
    );
  }
}

export default App;
