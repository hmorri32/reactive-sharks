import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { SharkMarker } from '../marker/marker';
import './App.css';

const position = [51.505, -0.09];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    this.props.fetchSharks();
    this.props.fetchPings();
  }

  renderPings() {
    return this.props.pings.map((ping, i) => {
      if (i < 500) {
        return (
          <SharkMarker
          key={i}
          id = { ping.shark_id }
          lat={ parseFloat(ping.latitude) }
          lng={ parseFloat(ping.longitude) }
          datetime={ ping.datetime }
          />
        )
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Map center={ position } zoom={2}>
          <TileLayer url='http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'/>
          { this.renderPings() }
        </Map>
      </div>
    );
  }
}
