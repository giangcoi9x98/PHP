import constants from '../constants';

const category = (data) => {
  return{
    type: constants.ALL_CATEGORY,
    playLoad: data,
  }
}
const get_Category = (params) => {
  return{
    type: constants.GET_ALL_CATEGORY,
    data: params,
  }
}
export {category, get_Category};
