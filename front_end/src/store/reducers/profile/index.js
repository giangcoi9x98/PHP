import constants from '../../constants';

const initState = {
  data: undefined,
}
const profileReducer = (state = initState, action) => {
  switch (action.type){
    case constants.GET_PROFILE:
      return{
        ...state,
        data: action.playLoad,
      }
    default:
      return state;
  }
}
export default profileReducer;
