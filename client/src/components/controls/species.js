import React from 'react';
import { SpecieButton } from '../button/specieButton';
import white from '../../images/white.svg';
import blue from '../../images/blue.svg';
import bull from '../../images/bull.svg';
import blacktip from '../../images/blacktip.svg';
import hammerhead from '../../images/hammerhead.svg';
import mako from '../../images/mako.svg';
import tiger from '../../images/tiger.svg';
import whale from '../../images/whale.svg';
import ship from '../../images/ship.svg';
import turtle from '../../images/turtle.svg';

const speciesIcons = [white, tiger, mako, blue, ship, blacktip, hammerhead, bull, blacktip, turtle, whale];

export const SpeciesPanel = ({ species, handleClick }) => {

  const renderSpeciesBtns = () => {
    species = species.map((specie, i) => { return { name: specie, icon: speciesIcons[i] } });
    console.log(species);
    return species.map((specie, i) =>
      <SpecieButton
        key={i}
        specie ={ specie.name }
        handleClick= { handleClick }
        icon={ specie.icon }
      />
    )
  }

  return (
    <div className='species-panel'>
      { renderSpeciesBtns() }
    </div>
  )
}
