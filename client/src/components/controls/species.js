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
import star from '../../images/all.svg';

const speciesIcons = [blacktip, blue, bull, turtle, hammerhead, mako, ship, blacktip, tiger, whale, white];

export const SpeciesPanel = ({ species, handleClick, resetMap, resetAll }) => {

  const renderSpeciesBtns = () => {
    const sortedSpecies = species.sort().map((specie, i) => { return { name: specie, icon: speciesIcons[i] } });
    console.log(sortedSpecies);
    return sortedSpecies.map((specie, i) =>
      <SpecieButton
        key={i}
        specie={ specie.name }
        handleClick={ handleClick }
        resetMap={ resetMap }
        icon={ specie.icon }
      />
    )
  }

  return (
    <div className='species-panel'>
      <div className='map-toggle-wrap'>
        <span className='map-type'>View All</span>
        <button
          onClick={ () => resetAll() }
          className='specie-btn'
          value='view all'
        >
          <img
            className='shark-icon star' src={ star }
            onClick={ () => resetAll() }
            />
        </button>
      </div>
      { renderSpeciesBtns() }
    </div>
  )
}
