import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { SpeciesPanel } from '../../components/controls/species';

const mockSpecies = [
  'Blacktip Shark (Carcharhinus limbatus)',
  'Blue Shark (Prionace glauca)',
  'Bull Shark (Carcharhinus leucas)',
  'Green Sea Turtle (Chelonia mydas)',
  'Hammerhead Shark (Sphyrna)',
  'Mako Shark (Isurus oxyrinchus)',
  'Ship (Motor Vessel)',
  'Silky Shark (Carcharhinus falciformis)',
  'Tiger Shark (Galeocerdo cuvier)',
  'Whale Shark (Rhincodon Typus)',
  'White Shark (Carcharodon carcharias)'
];

const mockIcons = [
  'blacktip',
  'blue',
  'bull',
  'turtle',
  'hammerhead',
  'mako',
  'ship',
  'blacktip',
  'tiger',
  'whale',
  'white'
];

describe('SpeciesPanel component', () => {

  it('renders a `.species-panel` class', () => {
    const wrapper = shallow(
      <SpeciesPanel
        species={mockSpecies}
        speciesIcons={mockIcons}
      />
    );
    expect(wrapper.props().className).to.equal('species-panel');
  });

  it('should render children nodes', () => {
    const wrapper = shallow(
      <SpeciesPanel
      species={mockSpecies}
      speciesIcons={mockIcons}
      />
    );

    expect(wrapper.props().children).to.be.an('array');

    expect(wrapper.props().children.length).to.equal(2);
    expect(wrapper.props().children[0].props.className).to.equal('map-toggle-wrap');

    expect(wrapper.props().children[1]).to.be.an('array');
    expect(wrapper.props().children[1].length).to.equal(11);

    expect(wrapper.props().children[1][0].props.specie).to.equal('Blacktip Shark (Carcharhinus limbatus)')
    expect(wrapper.props().children[1][0].props.icon).to.equal('blacktip.svg');
  });

});
