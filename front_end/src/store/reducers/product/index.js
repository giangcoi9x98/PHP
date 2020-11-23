import constants from '../../constants';

const initState = {
  data: undefined,
}
const allProductReducer = (state = initState, action) => {
  switch (action.type){
    case constants.PRODUCT:
      return{
        ...state,
        data: action.playLoad,
      }
    default:
      return state;
  }
}
export default allProductReducer;
