import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import modal from './modal';

export default combineReducers({
  modal,
  routing: routerReducer
});
