import React, { Component } from 'react';
import AppContainer         from '../../containers/AppContainer';
import RC2                  from 'react-chartjs2';
import * as helpers         from '../../helpers/fetch.js';
import './SharkDetail.css';

class SharkDetail extends Component {
  constructor() {
    super();
    this.state = {
      sharks: '',
      currentShark:''
    };
  }

  componentWillMount() {
    this.putSharksInState();
  }

  componentDidMount() {
    if (this.props.location.sharkData) {
      this.setState({ currentShark: this.props.location.sharkData });
    }
  }

  putSharksInState() {
    helpers.getAllSharks()
      .then(sharks => this.setState({sharks: sharks}));
  }

  flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(toFlatten);
    }, []);
  }

  gridLineOptions() {
    return {
      legend: {
        labels: {
          fontColor: 'black'
        }
      },
      scales: {
        yAxes: [{
          gridLines: {
            color: '#52B3D9'
          },
          scaleLabel: {
            display: true,
            labelString: 'lbs',
            fontColor: 'black'
          },
          ticks: {
            beginAtZero: true,
            fontColor: 'black'
          },
        }],
        xAxes: [{
          gridLines: {
            color: 'rgba(255,255,255, 0.5)'
          },
          scaleLabel: {
            display: false
          },
          ticks: {
            display: false,
            fontColor: 'navy',
            fontSize: 12
          }
        }]
      }
    };
  }

  filterArray(arr) {
    let index = -1,
      arr_length = arr ? arr.length : 0,
      resIndex = -1,
      result = [];

    while (++index < arr_length) {
      let value = arr[index];

      if (value) {
        result[++resIndex] = value;
      }
    }
    return result;
  }

  buildWeightChart() {
    const { sharks } = this.state;

    if(sharks.length) {
      let sharkNames    = sharks.map(shark => shark.name);
      const sharkWeight = sharks.map(shark => parseFloat(shark.weight));

      const data = {
        labels: sharkNames,
        datasets:[{
          label: 'Weight (lbs)',
          backgroundColor: '#52B3D9',
          borderColor: '#52B3D9',
          borderWidth: 1,
          hoverBackgroundColor: '#C5EFF7',
          hoverBorderColor: '#52B3D9',
          data: sharkWeight
        }]
      };

      return (
        <div className='chart-container'>
          <h1>All Sharks Weights Compared</h1>
          <RC2
            data={data}
            options={this.gridLineOptions()}
            type='bar'
            />
        </div>
      );
    }
  }

  buildPingChart() {
    const { currentShark } = this.state;
    let weight = currentShark.weight;
    let length = currentShark.length;
    const lat  = currentShark.pings.map(pings => parseFloat(pings.latitude));
    const long = currentShark.pings.map(pings => parseFloat(pings.longitude));
    const date = currentShark.pings.map(pings => pings.datetime);

    const data = {
      labels: date.reverse(),
      datasets:[
        {
          label: 'latitude',
          type: 'line',
          fill: false,
          showLine: false,
          borderColor: 'rgb(34, 49, 63)',
          pointBorderColor: 'rgb(34, 49, 63)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgb(34, 49, 63)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointRadius: 2,
          pointHitRadius: 2,
          data: lat.reverse(),
        },
        {
          label: 'longitude',
          backgroundColor: '#52B3D9',
          borderColor: '#52B3D9',
          borderWidth: 1,
          fill: false,
          showLine: false,
          hoverBackgroundColor: '#C5EFF7',
          hoverBorderColor: '#52B3D9',
          data: long.reverse()
        }
      ]
    };

    return(
     <div className='chart-container'>
      <h1>Latitude/Longitude Over Time</h1>
      <RC2
        options={this.gridLineOptions()}
        data={data}
        type='line'
      />
     </div>
    );
  }

  renderSharkDetail() {
    const { currentShark } = this.state;
    const { name, species, gender, stageOfLife, length, weight, tagLocation, dist_total, description } = currentShark;
    return(
      <div className='detail-div'>
        <h1>{name.toUpperCase()}</h1>
        <p>Species: {species}</p>
        <p>Gender: {gender}</p>
        <p>Stage of Life: {stageOfLife}</p>
        <p>Length: {length}</p>
        <p>Weight: {weight}</p>
        <p>Tag Location: {tagLocation}</p>
        <p>Distance Traveled: {dist_total} miles</p>
        <p>Description: {description}</p>
      </div>
    );
  }

  render() {
    return(
      <div className='shark-detail-container'>
        {this.state.currentShark && this.renderSharkDetail()}
        {this.state.currentShark && this.buildPingChart()}
        {this.state.sharks && this.state.currentShark && this.buildWeightChart()}
      </div>
    );
  }
}

export default AppContainer(SharkDetail);
