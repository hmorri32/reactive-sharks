import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

L.Icon.Default.imagePath = '.';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export const SharkMarker = ({ name, id, lat, lng, datetime }) => {
  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <div>
          <h3>Name: { name }</h3>
          <p>Date: { datetime }</p>
          <p>Latitude: { lat }</p>
          <p>Longitude: { lng }</p>
        </div>
     </Popup>
    </Marker>
  );
};
