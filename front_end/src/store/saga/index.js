import watchDataSign from "./SignIn";
import {all} from 'redux-saga/effects';

export default function* rootSaga(){
    yield all([watchDataSign()]);
}
