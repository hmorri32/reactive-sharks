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
    const LinkWithContext = withContext(Link, this.context)
    const { shark, pings, resetMap, handleTrackShark, zoom } = this.props;
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
            { zoom === 2
              ? <button
                  disabled={ shark.pings.length < 20 }
                  id={ shark.name }
                  onClick={(e) => handleTrackShark(e)}>
                  Track Shark
                </button>
              : <button onClick={() => resetMap()}>All Sharks</button>
            }
          </div>
        </Popup>
      </Marker>
    );
  }
}

export default AppContainer(SharkMarker);
