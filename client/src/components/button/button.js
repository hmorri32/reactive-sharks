import React from 'react';

export const Button = ({ btnName, handleClick }) => {
  return (
    <button
      onClick={ (e) => handleClick(e) }
      value={ btnName }
    >
    { btnName }
    </button>
  )
}
