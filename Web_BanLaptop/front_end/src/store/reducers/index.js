import { combineReducers } from 'redux';
import counts from './count/countReducer';
import product from './count/addProductReducer';
import modal from './modal/modalReducer';

const rootReducer = combineReducers({
  counts,
  product,
  modal,
});
export default rootReducer;
