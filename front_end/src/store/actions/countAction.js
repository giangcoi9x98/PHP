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
export function decrement() {
    return {
        type: constants.DECREMENT
    }
}
