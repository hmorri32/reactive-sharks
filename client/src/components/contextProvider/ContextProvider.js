import React, { Component, PropTypes } from 'react';

export function withContext(WrappedComponent, context){

  class ContextProvider extends React.Component {
    getChildContext() {
      return context;
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  ContextProvider.childContextTypes = {};
  Object.keys(context).forEach(key => {
    ContextProvider.childContextTypes[key] = React.PropTypes.any.isRequired;
  });

  return ContextProvider;
}
 