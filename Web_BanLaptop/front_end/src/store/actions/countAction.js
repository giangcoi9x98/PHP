export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_COUNT = 'ADD_COUNT';
export const UPDATE_ORDER = 'UPDATE_PRODUCT';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD_KEY = 'ADD_KEY';
export const DELETE_ORDER = 'DELETE_ORDER';
export const SUB_COUNT = 'SUB_COUNT';
export const ADD_ID = 'ADD_ID';
export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}
export function addId(id) {
  return {
    type: ADD_ID,
    payload: id,
  };
}
export function addKey(key) {
  return {
    type: ADD_KEY,
    payload: key,
  };
}
export function addCount(count) {
  return {
    type: ADD_COUNT,
    payload: count,
  };
}
export function subCount(count) {
  return {
    type: SUB_COUNT,
    payload: count,
  };
}

export function updateOrder(product) {
  return {
    type: UPDATE_ORDER,
    payload: product,
  };
}
export function deleteOrder(product) {
  return {
    type: DELETE_ORDER,
    payload: product,
  };
}
export function increment() {
  return {
    type: INCREMENT,
  };
}
export function decrement() {
  return {
    type: DECREMENT,
  };
}
