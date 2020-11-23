import getProfile from './api';
import {put} from 'redux-saga/effects';
import actions from '../../../actions/';
import constants from '../../../constants';
import {takeLatest} from 'redux-saga/effects';
function* getData(action){
  const result = yield getProfile();
  console.log('result', result);
  yield put(actions.getProfileAction(result));
}

function* watchDataGetProfile(){
  yield takeLatest(constants.ON_GET_PROFILE, getData);
}
export default watchDataGetProfile();


