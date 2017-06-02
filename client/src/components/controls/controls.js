import React from 'react';
import { Button } from '../button/button';
import menu from '../../images/list.svg'

export const ControlPanel = ({ sharks, handleChange, mapLayers, handleClick }) => {

  const renderMapBtns = () => {
    return mapLayers.map((layer, i) =>
      <Button
        className='map-btn'
        key={i}
        btnName={ layer.type }
        handleClick={ handleClick }
      />
    );
  }

  const renderOptions = () => {
    return sharks.map((shark, i) =>
      <option
        key={i}
        value={ shark.name }
      >
        { shark.name }
      </option>
    );
  }

  return (
    <aside className='controls'>
      <img className='menu-btn' src={ menu } alt='hamburger menu' />
      <select className='shark-select' onChange={ (e) => handleChange(e) }>
        <option value='select a shark'>Select a shark</option>
        { renderOptions() }
      </select>
      { renderMapBtns() }
    </aside>
  )
}
