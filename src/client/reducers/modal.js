import { HANDLE_SERVER_PROBLEM } from '../actions/index';

export default function modal(state = false, action) {
  switch(action.type) {
    case HANDLE_SERVER_PROBLEM:
      return {
        title: 'Error',
        body: 'There was problem with connection to server',
        button1: 'Close'
      };
    default:
      return false
  }
}
