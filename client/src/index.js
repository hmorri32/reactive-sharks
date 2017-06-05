import React        from 'react';
import { render }   from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware }             from 'react-router-redux';
import createHistory                    from 'history/createBrowserHistory';

import { ConnectedRouter } from 'react-router-redux';
import { Provider }        from 'react-redux';
import { Route }           from 'react-router-dom';
import thunk               from 'redux-thunk';
import logger              from 'redux-logger';

import { root }      from './reducers/rootReducer';
import App           from './components/app/App.js';
import SharkDetail   from './components/sharkDetail/SharkDetail.js';

import 'leaflet/dist/leaflet.css';
import './index.css';

const history    = createHistory();
const middleware = routerMiddleware(history);
const devTools   = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(root, devTools, applyMiddleware(middleware, thunk, logger));

const router = (
  <Provider store={ store }>
    <ConnectedRouter history={ history } >
      <div>
        <Route exact path='/' component={ App } />
        <Route exact path='/yung-charts/:id' component={ SharkDetail } />
      </div>
    </ConnectedRouter>
  </Provider>
);

render(router, document.getElementById('root'));
