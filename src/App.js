import React, { Component } from 'react';
import locations from './Map-Locations.json'
import MapContainer from './Map'
import './App.css';

class App extends Component {
  render() {
    return (
      <MapContainer mapLocations={locations}/>
    );
  }
}

export default App;
