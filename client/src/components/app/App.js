import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './App.css';
import L from 'leaflet';

L.Icon.Default.imagePath = '.';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const position = [51.505, -0.09];

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <Map center={position} zoom={2}>
          <TileLayer url='http://server.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}'/>
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 <a href='google.com'>click here</a> popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
          <Marker position={[20, -20]}>
            <Popup>
              <span>SUP DFJDKFJS</span>
            </Popup>
          </Marker>

        </Map>
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;
