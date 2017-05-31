import React from 'react';

export const ControlPanel = ({ sharks, handleChange }) => {

  const renderOptions = () => {
    return sharks.map((shark, i) => <option key={i} value={ shark.name }>{ shark.name }</option>)
  }

  return (
    <aside className="controls">
      <h3>ControlPanel</h3>
      <select onChange={ (e) => handleChange(e) }>
        <option value='select a shark'>Select a shark</option>
        { renderOptions() }
      </select>
    </aside>
  )
}
