import { watchDataSign, watchDataSignUp, watchDataGetProfile } from "./Profile";
import {all} from 'redux-saga/effects';
import watchDataCatagory from './Category';
import watchDataAllProduct from './Product';

export default function* rootSaga(){
    yield all([
      watchDataSign(),
      watchDataSignUp(),
      watchDataCatagory(),
      watchDataAllProduct(),
      watchDataGetProfile(),
    ]);
}
