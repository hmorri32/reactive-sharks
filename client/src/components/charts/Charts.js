import React, { Component } from 'react';
import AppContainer         from '../../containers/AppContainer';
import RC2                  from 'react-chartjs2';
import * as helpers         from '../../helpers/fetch.js';

class SharkDetail extends Component {
  constructor() {
    super();
    this.state = {
      sharks: ''
    };
  }

  componentWillMount() {
    this.putSharksInState();
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
    }
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
      const sharkWeight = sharks.map(shark => parseInt(shark.weight));

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
        <div>
          <RC2 
            data={data} 
            options={this.gridLineOptions()}
            type='bar' 
            />
        </div>
      );
    }
  } 

  render() {
    return(
      <div>CARNE A SUH DUDE
        {this.buildWeightChart()}
      </div>
    );
  }
}

export default AppContainer(SharkDetail);