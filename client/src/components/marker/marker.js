import React, { Component } from 'react';
import { Marker, Popup }    from 'react-leaflet';
import L                    from 'leaflet';
import { Button }           from '../button/button';
import { Link }             from 'react-router-dom';
import AppContainer         from '../../containers/AppContainer'

L.Icon.Default.imagePath = '.';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class SharkMarker extends Component {

  render() {
    return (
    <Marker router={this.props.router} history={this.props.history} position={[this.props.lat, this.props.lng]}>
      <Popup keepInView={ true }>
        <div>
          <h3>Name: { this.props.name }</h3>
          <p>Species: { this.props.species }</p>
          <p>Length: { this.props.length }</p>
          <p>Weight: { this.props.weight }</p>
          <p>Gender: { this.props.gender }</p>
          <p>Date: { this.props.datetime }</p>
          <p>Latitude: { this.props.lat }</p>
          <p>Longitude: { this.props.lng }</p>
          <a href='/yung-charts'>
            <h2 className='SUH'>HEY</h2>
          </a>
        </div>
     </Popup>
    </Marker>
    )
  }
}

export default AppContainer(SharkMarker);

