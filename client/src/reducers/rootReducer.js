import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import { users }           from './reducers';

export const root = combineReducers({
  users,
  router: routerReducer
});