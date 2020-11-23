import constants from '../constants';

const getProfileAction = (data) => {
  return{
    type: constants.GET_PROFILE,
    playLoad: data,
  }
}
const on_GetProfileAction = () => {
  return{
    type: constants.ON_GET_PROFILE,
  }
}
export {getProfileAction, on_GetProfileAction};
