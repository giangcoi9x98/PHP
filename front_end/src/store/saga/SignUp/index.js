import signUp from './api';
import {put} from 'redux-saga/effects';
import actions from '../../actions/';
import constants from '../../constants';
import {takeLatest} from 'redux-saga/effects';
function* getData(action){
  const result = yield signUp(action.playLoad);
  console.log('result', result);
  yield put(actions.SignUpAction(result));
}

function* watchDataSignUp(){
  yield takeLatest(constants.ON_SIGN_UP, getData);
}
export default watchDataSignUp;


