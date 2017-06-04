import React from 'react';
import { SpecieButton } from '../button/specieButton';

export const SpeciesPanel = ({ species, handleClick }) => {

  const renderSpeciesBtns = () => {
    
    return species.map((specie, i) =>
      <SpecieButton
        key={i}
        specie ={ specie }
        handleClick= { handleClick }
      />
    )
  }

  return (
    <div className='species-panel'>
      { renderSpeciesBtns() }
    </div>
  )
}
