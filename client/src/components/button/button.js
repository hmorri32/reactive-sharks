import React from 'react';

export const Button = ({ handleClick, className, icon, id }) => {
  return (
    <div className='map-toggle-wrap'>
      <span className='map-type'>{ id }</span>
      <button
        className={ className }
      >
        <img
          onClick={ (e) => handleClick(e) }
          id={ id }
          className='map-toggle-btn'
          src={ icon }
        />
      </button>
    </div>
  )
}
