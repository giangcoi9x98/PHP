import {getAllProduct, getProductById, updateProduct, deleteProduct, createProduct} from './api';
import {put, takeLatest} from 'redux-saga/effects';
import actions from '../../actions';
import constant from '../../constants';
function* dataAllProduct(action){
  const result = yield getAllProduct(action.playLoad);
  console.log(result);
  yield put(actions.product(result));
}

function* watchDataAllProduct(){
  yield takeLatest(constant.GET_ALL_PRODUCT, dataAllProduct);
}

export default watchDataAllProduct;
