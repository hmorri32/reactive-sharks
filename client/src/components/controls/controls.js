import React from 'react';
import { Button } from '../button/button';

export const ControlPanel = ({ handleChange, mapLayers, handleClick }) => {

  const renderMapBtns = () => {
    return mapLayers.map((layer, i) =>
      <Button
        className='map-btn'
        key={i}
        icon={ layer.img }
        id={ layer.type }
        handleClick={ handleClick }
      />
    );
  }

  return (
    <aside className='controls'>
      { renderMapBtns() }
    </aside>
  )
}
