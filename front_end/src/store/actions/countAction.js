export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_COUNT = 'ADD_COUNT';
export const UPDATE_ORDER = 'UPDATE_PRODUCT';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
}
export function addCount(count) {
  return {
    type: ADD_COUNT,
    payload: count,
  };
}
export function updateOrder(product) {
  return {
    type: UPDATE_ORDER,
    payload: product,
  };
}
export function increment() {
    return {
        type:INCREMENT
    }
}
export function decrement() {
    return {
        type:DECREMENT
    }
}