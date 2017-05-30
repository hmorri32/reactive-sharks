import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import { sharks, pings }   from './reducers';

export const root = combineReducers({
  sharks,
  pings,
  router: routerReducer
});
