import React from 'react';

export const SpecieButton = ({ specie, handleClick }) => {
  const index = specie.split('').findIndex(letter => letter === '(');
  specie = specie.slice(0, index);
  return (
      <button
        onClick={ (e) => handleClick(e) }
        value={ specie }
      >
        { specie }
      </button>
  )
}
