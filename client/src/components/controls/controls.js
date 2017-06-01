import React from 'react';
import { Button } from '../button/button';

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
    <aside className="controls">
      <h3>ControlPanel</h3>
      <select onChange={ (e) => handleChange(e) }>
        <option value='select a shark'>Select a shark</option>
        { renderOptions() }
      </select>
      { renderMapBtns() }
    </aside>
  )
}
