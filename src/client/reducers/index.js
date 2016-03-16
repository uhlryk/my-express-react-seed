import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import modal from './modal';
import user from './user';

export default combineReducers({
  modal,
  user,
  routing: routerReducer
});
