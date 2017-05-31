import React, { Component } from 'react';
import { Map, TileLayer, Polyline } from 'react-leaflet';
import { SharkMarker } from '../marker/marker';
import { ControlPanel } from '../controls/controls';

import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      mapSrc: '',
      current: '',
      position: [51.505, -0.09],
      zoom: 2,
      pings: ''
    };
  }

  componentDidMount() {
    this.props.fetchSharks();
  }

  handleChange(e) {
    const { sharks } = this.props;
    this.setState({ current: sharks.find(shark => shark.name === e.target.value) }, this.updateMap);
  }

  updateMap() {
    const { current } = this.state;
    this.setState({
      zoom: 3,
      position: [parseFloat(current.pings[0].latitude), parseFloat(current.pings[0].longitude)]
    }, this.connectTheDots(this.state.current.pings));
  }

  connectTheDots(data) {
    let c = [];
    for(let i = 0; i < 10; i++) {
      let x = data[i].latitude;
      let y = data[i].longitude;
      c.push([x, y]);
    }
    this.setState({pings: c});
  }

  renderPings() {
    const { current } = this.state;
    if (current) {
      const pings = current.pings.slice(0, 10).reverse();
      return pings.map((ping, i) => {
        while (i < 100 ) {
          return (
            <SharkMarker
              key = { i }
              name =  { current.name }
              species = { current.species }
              length = { current.length }
              weight = { current.weight }
              gender = { current.gender }
              id = { ping.shark_id }
              lat = { parseFloat(ping.latitude) }
              lng = { parseFloat(ping.longitude) }
              datetime = { ping.datetime }
            />
          );
        }
      });
    }
  }

// http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}
  render() {
    const { sharks } = this.props;
    const { zoom, position, pings } = this.state;

    return (
      <div className="App">
        <ControlPanel
          sharks={ sharks }
          handleChange={ this.handleChange.bind(this) }
        />
        <Map 
          center={ position } 
          zoom={ zoom }>
          <TileLayer 
            url='https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaG1vcnJpMzIiLCJhIjoiY2ozZDltYWl4MDAyMzMybGpmYjgwbXU4dSJ9.orU4vtAslw8Zf8K5ytPCfQ'
          />
            { this.renderPings() }
          <Polyline 
            color={'red'} 
            positions={pings} 
          />
        </Map>
      </div>
    );
  }
}