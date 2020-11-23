import watchDataSign from "./SignIn";
import {all} from 'redux-saga/effects';
import watchDataSignUp from './SignUp';
import watchDataCatagory from './Category';
import watchDataAllProduct from './Product';

export default function* rootSaga(){
    yield all([
      watchDataSign(),
      watchDataSignUp(),
      watchDataCatagory(),
      watchDataAllProduct(),
    ]);
}
