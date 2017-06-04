import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import { sharks, species }   from './reducers';

export const root = combineReducers({
  sharks,
  species,
  router: routerReducer
});
