import React from 'react';
import arrow from '../../images/triangle.svg';

export const SpecieButton = ({ specie, handleClick, icon, resetMap }) => {
  const index = specie.split('').findIndex(letter => letter === '(');
  specie = specie.slice(0, index);
  return (
    <div
      id={ specie }
      className='map-toggle-wrap'
      onClick={ (e) => { handleClick(e); resetMap() } }>
      <span
        id={ specie }
        onClick={ (e) => { handleClick(e); resetMap() } }
        className='map-type'>
        { specie }<img className='arrow' src={arrow}/>
      </span>
      <button
        className='specie-btn'
        value={ specie }>
        <img
          id={ specie }
          className='shark-icon' src={ icon }
          onClick={ (e) => { handleClick(e); resetMap() } }
        />
      </button>
    </div>
  )
}
