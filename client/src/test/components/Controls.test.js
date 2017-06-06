import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { ControlPanel } from '../../components/controls/controls';

const mockMapLayers = [
  { type: 'satellite', img: '/satellite.jpg' },
  { type: 'topo', img: '/topo.jpg' },
  { type: 'street', img: '/street.jpg' }
];

describe('Controls component', () => {

  it('should have a `.controls` class', () => {
    const wrapper = shallow(
      <ControlPanel mapLayers={mockMapLayers}/>
    );

    expect(wrapper.props().className).to.equal('controls');
  });

  it('should have three children that are objects', () => {
    const wrapper = shallow(
      <ControlPanel mapLayers={mockMapLayers}/>
    );

    expect(wrapper.props().children).to.have.length(3);
    expect(wrapper.props().children[0]).to.be.an('object');
    expect(wrapper.props().children[1]).to.be.an('object');
    expect(wrapper.props().children[2]).to.be.an('object');
  });

  it('its children should have props from mapLayers', () => {
    const wrapper = shallow(
      <ControlPanel mapLayers={mockMapLayers}/>
    );

    expect(wrapper.props().children[0].props.className).to.equal('map-btn')
    expect(wrapper.props().children[0].props.icon).to.equal('/satellite.jpg')
    expect(wrapper.props().children[0].props.id).to.equal('satellite')

    expect(wrapper.props().children[1].props.className).to.equal('map-btn')
    expect(wrapper.props().children[1].props.icon).to.equal('/topo.jpg')
    expect(wrapper.props().children[1].props.id).to.equal('topo')

    expect(wrapper.props().children[2].props.className).to.equal('map-btn')
    expect(wrapper.props().children[2].props.icon).to.equal('/street.jpg')
    expect(wrapper.props().children[2].props.id).to.equal('street')
  })

});
