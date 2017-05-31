import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Button } from '../button/button';

L.Icon.Default.imagePath = '.';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export const SharkMarker = ({ name, species, length, weight, gender, id, lat, lng, datetime }) => {
  return (
    <Marker position={[lat, lng]}>
      <Popup>
        <div>
          <h3>Name: { name }</h3>
          <p>Species: { species }</p>
          <p>Length: { length }</p>
          <p>Weight: { weight }</p>
          <p>Gender: { gender }</p>
          <p>Date: { datetime }</p>
          <p>Latitude: { lat }</p>
          <p>Longitude: { lng }</p>
          <Button btnName='Track Shark' />
        </div>
     </Popup>
    </Marker>
  );
};
