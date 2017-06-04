import React, { Component }         from 'react';
import { Map, TileLayer, Polyline } from 'react-leaflet';
import SharkMarker                  from '../marker/marker';
import { ControlPanel }             from '../controls/controls';
import AppContainer                 from '../../containers/AppContainer';
import * as helpers                 from '../../helpers/fetch.js';
import satellite                    from '../../images/satellite.svg';
import globe                        from '../../images/globe.svg';
import road                         from '../../images/road.svg';
import mountain                     from '../../images/snow.svg';
import { Route }                    from 'react-router-dom';
import { Link }                     from 'react-router-dom';
import { Marker, Popup }            from 'react-leaflet';

import './App.css';

function withContext(WrappedComponent, context){

  class ContextProvider extends React.Component {
    getChildContext() {
      return context;
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  ContextProvider.childContextTypes = {};
  Object.keys(context).forEach(key => {
    ContextProvider.childContextTypes[key] = React.PropTypes.any.isRequired; 
  });

  return ContextProvider;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      mapLayers: [
        { type: 'Satellite', url: 'World_Imagery/MapServer/', img: satellite },
        { type: 'Nat Geo', url: 'NatGeo_World_Map/MapServer/', img: globe },
        { type: 'Physical', url: 'World_Physical_Map/MapServer/', img: mountain },
        { type: 'Street', url: 'World_Street_Map/MapServer/', img: road }
      ],
      currentLayer: 'World_Imagery/MapServer/',
      current: '',
      position: [0, -0.00],
      zoom: 2,
      pings: '',
      sharks: ''
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.fetchSharks();
    this.putSharksInState();
  }

  putSharksInState() {
    helpers.getAllSharks()
      .then(sharks => this.setState({sharks: sharks}));
  }

  handleChange(e) {
    const { sharks } = this.props;
    if(e.target.value === 'select a shark'){
      this.setState({ current: '', pings: '', zoom: 2, position: [0, -0]});
      this.putSharksInState();
      this.renderInitialSharks();
    } else {
      this.setState({ current: sharks.find(shark => shark.name === e.target.value) }, this.updateMap);
    }
  }


  handleClick(e) {
    const { mapLayers } = this.state;
    return mapLayers.map(layer => {
      if (layer.type === e.target.id) {
        this.setState({ currentLayer: layer.url });
      }
    });
  }

  updateMap() {
    const { current } = this.state;
    this.setState({
      zoom: 6,
      position: [parseFloat(current.pings[0].latitude), parseFloat(current.pings[0].longitude)]
    }, this.connectTheDots(current.pings));
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

  renderOptions() {
    const { sharks } = this.props;
    return sharks.map((shark, i) =>
      <option
        key={i}
        value={ shark.name }
      >
        { shark.name }
      </option>
    );
  }

  renderInitialSharks() {

    const LinkWithContext = withContext(Link, this.context);

    if (this.state.sharks.length > 0 && !this.state.current) {
      const { sharks } = this.state;
      return sharks.map((shark) => {
        const ping = shark.pings[0];
        return (
          <Marker position={[parseFloat(ping.latitude), parseFloat(ping.longitude)]}            key = { shark.id }>
            <Popup keepInView={true}>
              <div>
                <h3>Name: { shark.name }</h3>
                <p>Species: { shark.species }</p>
                <p>Length: { shark.length }</p>
                <p>Weight: { shark.weight }</p>
                <p>Gender: { shark.gender }</p>
                <p>Date: { shark.datetime }</p>
                <p>Latitude: { ping.latitude }</p>
                <p>Longitude: { ping.longitude }</p>                
                <LinkWithContext to={{
                  pathname: `/yung-charts/${shark.id}`
                }}>
                  {shark.name} detail
                </LinkWithContext>
              </div>
            </Popup>
          </Marker>
        );
      });
    }
  }

  renderPings() {
    const { current } = this.state;
    if (current) {
      const pings = current.pings.slice(0, 10).reverse();
      return pings.map((ping, i) => {
        while (i < 10 ) {
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

  render() {
    const { sharks } = this.props;
    const { zoom, position, pings, mapLayers, currentLayer } = this.state;
    return (
      <div className="App">
        <select className='shark-select' onChange={ (e) => this.handleChange(e) }>
          <option value='select a shark'>Select a shark</option>
          { this.renderOptions() }
        </select>
        {this.currentShark && <div>this.currentShark.name</div>}
        <ControlPanel
          history = {this.props.history}
          router = {this.props.router}
          mapLayers={ mapLayers }
          sharks={ sharks }
          handleChange={ this.handleChange.bind(this) }
          handleClick={ this.handleClick.bind(this) }
        />
        <Map
          animate={ true }
          useFlyTo={ true }
          ref={ (input) => this.map = input }
          center={ position }
          zoom={ zoom }
        >
          <TileLayer
            url={`http://server.arcgisonline.com/ArcGIS/rest/services/${currentLayer}/tile/{z}/{y}/{x}`}
          />
            { this.renderPings() }
            { this.renderInitialSharks() }
            { !pings
              ? <div></div>
              : <Polyline
                  color={'red'}
                  positions={pings}
                />
              }

        </Map>
      </div>
    );
  }
}

export default AppContainer(App);