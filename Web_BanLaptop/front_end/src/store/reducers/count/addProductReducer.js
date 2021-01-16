import {
  ADD_PRODUCT,
  UPDATE_ORDER,
  ADD_KEY,
  DELETE_ORDER,
  ADD_ID,
} from '../../actions/countAction';
import Cookie from 'js-cookie';
import orderCookie from '../../../utils/orderLocalStorage';

function product(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case ADD_PRODUCT:
      //newState = { ...state };
      newState.listOrderProduct.push(action.payload);
      orderCookie.saveOrder(newState.listOrderProduct);
      return newState;
    case UPDATE_ORDER:
      // newState = { ...state };
      newState.listOrderProduct.push(action.payload);
      orderCookie.updateOrder(newState.listOrderProduct);
      return newState;
    case DELETE_ORDER:
      newState.listOrderProduct = orderCookie.deleteOrder(
        newState.listOrderProduct,
        action.payload,
      );
      orderCookie.saveOrder(newState.listOrderProduct);
      return newState;
    case ADD_KEY:
      return {
        newState,
        key: action.payload,
      };
    case ADD_ID:
      return {
        newState,
        id: action.payload,
      };
    default:
      return state;
  }
}

export default product;
