import React, { Component } from 'react';
import locations from './Map-Locations.json'
import MapContainer from './Map'
import List from './List'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
          <List listLocations={locations}>
          </List>

          <MapContainer mapLocations={locations}/>
      </div>
    );
  }
}

export default App;
