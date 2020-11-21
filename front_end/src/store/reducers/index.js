import { combineReducers } from 'redux';
import counts from './count/countReducer';
import product from './count/addProductReducer';
import modal from './modal/modalReducer';
import SignReduxcer from './signIn';
const rootReducer = combineReducers({
  counts,
  product,
  modal,
  SignReduxcer,
});
export default rootReducer;
