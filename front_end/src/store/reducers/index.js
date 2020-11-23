import { combineReducers } from 'redux';
import counts from './count/countReducer';
import product from './count/addProductReducer';
import modal from './modal/modalReducer';
import signInReducer from './signIn';
import signUpReducer from './signUp';
import allCategoryReducer from './catagory';
import allProductReducer from './product';
const rootReducer = combineReducers({
  counts,
  product,
  modal,
  signInReducer,
  signUpReducer,
  allCategoryReducer,
  allProductReducer,
});
export default rootReducer;
