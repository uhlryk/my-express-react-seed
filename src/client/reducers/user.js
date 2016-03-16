import { SET_USER } from '../actions/index';

export default function user(state = false, action) {
  switch(action.type) {
    case SET_USER:
      return {
        token: action.token,
        email: action.email
      };
    default:
      return state
  }
}
