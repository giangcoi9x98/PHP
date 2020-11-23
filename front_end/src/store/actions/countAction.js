import constants from '../constants';
export function addProduct(product) {
  return {
    type: constants.ADD_PRODUCT,
    payload: product,
  };
}
export function addCount(count) {
  return {
    type: constants.ADD_COUNT,
    payload: count,
  };
}
export function addId(id) {
  return {
    type: constants.ADD_ID,
    payload: id,
  };
}
export function addKey(key) {
  return {
    type: constants.ADD_KEY,
    payload: key,
  };
}
export function updateOrder(product) {
  return {
    type: constants.UPDATE_ORDER,
    payload: product,
  };
}
export function increment() {
    return {
        type: constants.INCREMENT
    }
}
export function deleteOrder(product) {
  return {
    type: constants.DELETE_ORDER,
    payload: product,
  };
}
export function subCount(count) {
  return {
    type: constants.SUB_COUNT,
    payload: count,
  };
}
export function decrement() {
    return {
        type: constants.DECREMENT
    }
}
