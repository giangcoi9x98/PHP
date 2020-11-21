import constants from '../../constants';
import Cookie from 'js-cookie';
import orderCookie from '../../../utils/orderLocalStorage';

function product(state = {}, action) {
  let newState={...state};
  switch (action.type) {
    case constants.ADD_PRODUCT:
     //newState = { ...state };
      newState.listOrderProduct.push(action.payload);
      orderCookie.saveOrder(newState.listOrderProduct)
      return newState;
    case constants.UPDATE_ORDER:
     // newState = { ...state };
      newState.listOrderProduct.push(action.payload)
      orderCookie.updateOrder(newState.listOrderProduct)
      return newState;
    default:
      return state;
  }
}

export default product;
