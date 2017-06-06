import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { SpecieButton } from '../../components/button/specieButton';

const specie = 'White Shark (Carcharodon carcharias)';

describe('SpecieButton component', () => {

  it('renders a `.map-toggle-wrap`', () => {
    const wrapper = shallow(<SpecieButton specie={specie}/>);

    expect(wrapper.find('.map-toggle-wrap')).to.have.length(1);
  });

  it('should render children nodes', () => {
    const wrapper = shallow(
      <SpecieButton
        specie={specie}
        icon='./images/test-icon.svg'
      />
    );

    const span = wrapper.find('.map-type');
    const button = wrapper.find('.specie-btn');
    const img = wrapper.find('.shark-icon');

    expect(span.text()).to.equal('White Shark ');
    expect(button.props().id).to.equal('White Shark ');
    expect(button.props().value).to.equal('White Shark ');
    expect(img.props().id).to.equal('White Shark ');
    expect(img.props().src).to.equal('./images/test-icon.svg');
  });

  it('should simulate onClick events', () => {
    const handleClick = sinon.spy();
    const resetMap = sinon.spy();
    const wrapper = shallow(
      <SpecieButton
        specie={specie}
        handleClick={handleClick}
        resetMap={resetMap}
      />
    )

    wrapper.find('.specie-btn').simulate('click');
    wrapper.find('.shark-icon').simulate('click');

    expect(handleClick.calledTwice).to.equal(true);
    expect(resetMap.calledTwice).to.equal(true);
  })

});
