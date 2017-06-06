import React, { Component, PropTypes } from 'react';
import { Marker, Popup }    from 'react-leaflet';
import L                    from 'leaflet';
import AppContainer         from '../../containers/AppContainer';
import { Link }             from 'react-router-dom';
import { withContext }      from '../contextProvider/ContextProvider'

L.Icon.Default.imagePath = '.';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

class SharkMarker extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    const LinkWithContext  = withContext(Link, this.context)
    const { shark, pings } = this.props;
    return (
      <Marker
        position={
          [parseFloat(pings.latitude), parseFloat(pings.longitude)]}>
        <Popup keepInView={true} className='custom-popup'>
          <div className='shark-data'>
            <h3>{ shark.name }</h3>
            <p>Species: { shark.species }</p>
            <p>Length: { shark.length }</p>
            <p>Weight: { shark.weight }</p>
            <p>Date: { pings.datetime }</p>
            <LinkWithContext to={{
              pathname: `/yung-charts/${shark.id}`,
              sharkData: shark
            }}>
              <button className='popup-btn'>
                <span>Shark Details</span>
              </button>
            </LinkWithContext>
            <button
              id={ shark.name }
              onClick={ (e) => this.props.handleTrackShark(e) }
            >
              Track Shark
            </button>
          </div>
        </Popup>
      </Marker>
    );
  }
}





export default AppContainer(SharkMarker);



