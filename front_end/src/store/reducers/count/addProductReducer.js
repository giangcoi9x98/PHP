import { ADD_PRODUCT ,UPDATE_ORDER,ADD_KEY, DELETE_ORDER} from '../../actions/countAction';
import Cookie from 'js-cookie';
import orderCookie from '../../../utils/orderLocalStorage';

function product(state = {}, action) {
  let newState={...state};
  switch (action.type) {
    case ADD_PRODUCT:
     //newState = { ...state };
      newState.listOrderProduct.push(action.payload);
      orderCookie.saveOrder(newState.listOrderProduct)
      return newState;
    case UPDATE_ORDER:
     // newState = { ...state };
      newState.listOrderProduct.push(action.payload)
      orderCookie.updateOrder(newState.listOrderProduct)
      return newState;
    case DELETE_ORDER:
      let id = action.payload
      return {
        ...newState,
        listOrderProduct: state.listOrderProduct.filter(
          (product)=>product.id!==id)
      }
      
    case ADD_KEY:
      return {
        newState,
        key:action.payload
      } 
    default:
      return state;
  }
}

export default product;
