import logIn from './api';
import {put} from 'redux-saga/effects';
import actions from '../../actions/';
import constants from '../../constants';
import {takeLatest} from 'redux-saga/effects';
function* getData(action){
    const result = yield logIn(action.playLoad.username, action.playLoad.password);
    yield put(actions.SignInAction(result));
}

function* watchDataSign(){
    yield takeLatest(constants.ON_SIGNIN, getData);
}
export default watchDataSign;


