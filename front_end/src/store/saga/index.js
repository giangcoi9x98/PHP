import watchDataSign from "./Profile/SignIn";
import {all} from 'redux-saga/effects';
import watchDataSignUp from './Profile/SignUp';
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
