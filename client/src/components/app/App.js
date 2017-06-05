import React, { Component }         from 'react';
import { Map, TileLayer, Polyline } from 'react-leaflet';
import SharkMarker                  from '../marker/marker';
import { ControlPanel }             from '../controls/controls';
import { SpeciesPanel }             from '../controls/species';
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
      sharks: '',
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.fetchSharks();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sharks !== nextProps.sharks) {
      this.setState({ sharks: nextProps.sharks })
    }
  }

  resetMap() {
    this.setState({ current: '', pings: '', zoom: 2, position: [0, -0] });
  }

  handleChange(e) {
    const { sharks } = this.props;
    if (e.target.value === 'select a shark') {
      this.fetchAllSharks();
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

  handleTrackShark(e) {
    const { sharks } = this.props;
    this.setState({ current: sharks.find(shark => shark.name === e.target.id) }, this.updateMap);
  }

  fetchAllSharks() {
    this.props.fetchSharks();
    this.resetMap();
    this.renderInitialSharks();
  }

  updateMap() {
    const { current } = this.state;
    this.setState({
      zoom: 5,
      position: [parseFloat(current.pings[0].latitude), parseFloat(current.pings[0].longitude)]
    }, this.connectTheDots(current.pings));
  }

  connectTheDots(data) {
    let c = [];
    for(let i = 0; i < 20; i++) {
      let x = data[i].latitude;
      let y = data[i].longitude;
      c.push([x, y]);
    }
    this.setState({pings: c});
  }

  handleSharkType(e) {
    this.props.fetchSpecie(e.target.id);
    this.renderInitialSharks();
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
    const { current } = this.state;
    const { sharks } = this.props;
    if (sharks.length > 0 && !current) {

    const LinkWithContext = withContext(Link, this.context);

      return sharks.map((shark) => {
        const ping = shark.pings[0];
        return (
          <Marker
            position={[parseFloat(ping.latitude), parseFloat(ping.longitude)]}
            key = { shark.id }>
            <Popup keepInView={true}>
              <div>
                <h3>Name: { shark.name }</h3>
                <p>Species: { shark.species }</p>
                <p>Length: { shark.length }</p>
                <p>Weight: { shark.weight }</p>
                <p>Gender: { shark.gender }</p>
                <p>Latitude: { ping.latitude }</p>
                <p>Longitude: { ping.longitude }</p>
                <p>Date: { ping.datetime }</p>
                <LinkWithContext to={{
                  pathname: `/yung-charts/${shark.id}`,
                  sharkData: shark
                }}>
                  <h2>{shark.name} detail</h2>
                </LinkWithContext>
                <button
                  id={ shark.name }
                  onClick={ (e) => this.handleTrackShark(e) }
                >
                Track Shark
                </button>
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
      const LinkWithContext = withContext(Link, this.context);
      const pings = current.pings.slice(0, 20);
      return pings.map((ping, i) => {
        while (i < 20 ) {
          return (
            <Marker
              position={[parseFloat(ping.latitude), parseFloat(ping.longitude)]}
              key = { i }>
              <Popup keepInView={true}>
                <div>
                  <h3>Name: { current.name }</h3>
                  <p>Species: { current.species }</p>
                  <p>Length: { current.length }</p>
                  <p>Weight: { current.weight }</p>
                  <p>Gender: { current.gender }</p>
                  <p>Latitude: { ping.latitude }</p>
                  <p>Longitude: { ping.longitude }</p>
                  <p>Date: { ping.datetime }</p>
                  <LinkWithContext to={{
                    pathname: `/yung-charts/${current.id}`,
                    sharkData: this.state.current
                  }}>
                    <h2>{current.name} detail</h2>
                  </LinkWithContext>
                  <button onClick={ () => this.resetMap() }>
                    View All Sharks
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        }
      });
    }
  }

  render() {
    const { sharks, species } = this.props;
    const { zoom, position, pings, mapLayers, currentLayer } = this.state;
    return (
      <div className="App">
        <select className='shark-select' onChange={ (e) => this.handleChange(e) }>
          <option value='select a shark'>Select a shark</option>
          { this.renderOptions() }
        </select>
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
        <SpeciesPanel
          species={ species }
          handleClick={ this.handleSharkType.bind(this) }
          resetMap={ this.resetMap.bind(this) }
          resetAll={ this.fetchAllSharks.bind(this) }
        />
      </div>
    );
  }
}

export default AppContainer(App);
