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


export const SharkMarker = ({ id, lat, lng, datetime }) => {
  let name;
  switch (id) {
  case 20:
    name = 'Nico';
    break;
  case 24:
    name = 'Luis Antonio';
    break;
  case 25:
    name = 'Cyndi';
    break;
  case 31:
    name = 'Maddox';
    break;
  case 41:
    name = 'Mary Lee';
    break;
  case 65:
    name = 'Katharine';
    break;
  default: null;
  }

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
