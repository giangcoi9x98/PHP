import getAllcategoryId from './api';
import {put} from 'redux-saga/effects';
import actions from '../../actions/';
import constants from '../../constants';
import {takeLatest} from 'redux-saga/effects';
function* getData(action){
  const result = yield getAllcategoryId(action.playLoad);
  yield put(actions.catagory(result));
}

function* watchDataCatagory(){
  yield takeLatest(constants.GET_ALL_CATEGORY, getData);
}
export default watchDataCatagory;


