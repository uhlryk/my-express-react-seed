import { SHOW_MODAL } from '../actions/index';

export default function modal(state = false, action) {
  switch(action.type) {
    case SHOW_MODAL:
      return {
        showModal: true,
        modalType: action.modalType,
        title: action.title,
        body: action.body
      };
    default:
      return {
        showModal: false
      }
  }
}
