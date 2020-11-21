import constant from '../../constants';

function modal(state = [], action) {
  switch (action.type) {
    case constant.SHOW_MODAL:
      return {
        ...state,
        isOpen: action.payload,
      };
    case constant.CLOSE_MODAL:
      return {
        ...state,
        isOpen: action.payload,
      };
    case constant.SHOW_SIGNIN_MODAL:
      return {
        ...state,
        isBodySignIn: action.payload,
      };
    case constant.SHOW_SIGNUP_MODAL:
      return {
        ...state,
        isBodySignIn: action.payload,
      };
    default:
      return state;
  }
}
export default modal;
