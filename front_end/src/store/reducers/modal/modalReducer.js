import constant from '../../constants';
import orderLocalStorage from '../../../utils/orderLocalStorage';
const initialState = {
  isBodySignIn:true,
  isOpen:false
};
function modal(state = initialState, action) {
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
