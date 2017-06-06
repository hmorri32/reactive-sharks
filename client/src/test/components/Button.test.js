import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { Button } from '../../components/button/button';

describe('Button Component', () => {

  it('renders a `.map-toggle-wrap`', () => {
    const wrapper = shallow(<Button />);

    expect(wrapper.find('.map-toggle-wrap')).to.have.length(1);
    expect(wrapper.find('.map-toggle-btn')).to.have.length(1);
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('s children have props', () => {
    const wrapper = shallow(<Button
      id='satellite'
      icon='images/satellite-icon.svg'
    />);

    const span = wrapper.find('.map-type');
    const img = wrapper.find('.map-toggle-btn');

    expect(span.text()).to.equal('satellite');
    expect(img.props().id).to.equal('satellite');
    expect(img.props().src).to.equal('images/satellite-icon.svg');
  })

  it('simulates button clicks', () => {
    const handleClick = sinon.spy();
    const wrapper = shallow(<Button handleClick={handleClick} />);
    wrapper.find('.map-toggle-btn').simulate('click');

    expect(handleClick.calledOnce).to.equal(true);
  });
});
