import React from 'react';

export const SpecieButton = ({ specie, handleClick, icon, resetMap }) => {
  const index = specie.split('').findIndex(letter => letter === '(');
  specie = specie.slice(0, index);
  return (
    <div className='map-toggle-wrap'>
      <span className='map-type'>{ specie }</span>
      <button
        id={ specie }
        onClick={ (e) => { handleClick(e); resetMap() } }
        className='specie-btn'
        value={ specie }
      >
        <img
          id={ specie }
          className='shark-icon' src={ icon }
          onClick={ (e) => { handleClick(e); resetMap() } }
          />
      </button>
    </div>
  )
}
