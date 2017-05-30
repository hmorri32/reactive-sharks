import React, { Component } from 'react';
import { Marker, Popup, Map, TileLayer } from 'react-leaflet';
import { SharkMarker } from '../marker/marker';
import './App.css';

const position = [51.505, -0.09];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      mapSrc: ''
    };
  }

  componentDidMount() {
    this.props.fetchSharks();
    this.props.fetchPings(20);
  }

  renderPings() {
    const { sharks } = this.props;

    return sharks.map((shark) => {
      return shark.pings.map((ping, i) => {
        if (i < 1 ) {
          return (
            <SharkMarker
              name =  { shark.name }
              key = { i }
              id = { ping.shark_id }
              lat = { parseFloat(ping.latitude) }
              lng = { parseFloat(ping.longitude) }
              datetime = { ping.datetime }
            />
          );
        }
      });
    });
  }
// http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}
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
