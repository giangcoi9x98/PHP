import {
  SHOW_MODAL,
  CLOSE_MODAL,
  SHOW_SIGNIN_MODAL,
  SHOW_SIGNUP_MODAL,
} from '../../actions/modalAction';

function modal(state = [], action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        isOpen: action.payload,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: action.payload,
      };
    case SHOW_SIGNIN_MODAL:
      return {
        ...state,
        isBodySignIn: action.payload,
      };
    case SHOW_SIGNUP_MODAL:
      return {
        ...state,
        isBodySignIn: action.payload,
      };
    default:
      return state;
  }
}
export default modal;
