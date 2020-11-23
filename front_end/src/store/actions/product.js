import constants from '../constants';

const product = (data) => {
  return{
    type: constants.PRODUCT,
    playLoad: data,
  }
}
const get_Product = (data) => {
  return{
    type: constants.GET_ALL_PRODUCT,
    playLoad: data,
  }
}
export {product, get_Product};
