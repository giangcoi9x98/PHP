import constants from '../constants';

const getProfileAction = (data) => {
  return{
    type: constants.GET_PROFILE,
    playLoad: data,
  }
}
const on_GetProfileAction = (data) => {
  return{
    type: constants.ON_GET_PROFILE,
    playLoad: data,
  }
}
export {getProfileAction, on_GetProfileAction};
