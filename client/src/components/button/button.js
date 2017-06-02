import React from 'react';

export const Button = ({ btnName, handleClick, className }) => {
  return (
    <button
      className={ className }
      onClick={ (e) => handleClick(e) }
      value={ btnName }
    >
    { btnName }
    </button>
  )
}
