import React from 'react';
import arrow from '../../images/triangle.svg';


export const Button = ({ handleClick, className, icon, id }) => {
  return (
    <div className='map-toggle-wrap'>
      <span className='map-type'>{ id }<img className='arrow' src={arrow}/></span>
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
