import { createStore } from 'redux';
import rootReducer from './reducers/index';
import Cookie from 'js-cookie'
import orderLocalStorage from '../utils/orderLocalStorage'

const initialState = {
  counts: {
    current: 1,
    total: orderLocalStorage.getTotalCount(),
  },
  product: {
    listOrderProduct: orderLocalStorage.getOrder(),
    total: orderLocalStorage.getTotalCount(),
    key:''
  },
  modal: {
    isBodySignIn:true,
    isOpen:false
  }
};
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export default store;
