import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

function dummyReducer(state = '', action) {
  return state
}

export default combineReducers({
  dummyReducer,
  routing: routerReducer
});
