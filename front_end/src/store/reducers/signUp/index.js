import constants from '../../constants';

const initState = {
  data: {
    data: undefined,
    status: undefined,
  }
}
const signUpReducer = (state = initState, action) => {
  switch (action.type){
    case constants.SIGN_UP:
      return{
        ...state,
        data: action.playLoad,
      }
    default:
      return state;
  }
}
export default signUpReducer;
