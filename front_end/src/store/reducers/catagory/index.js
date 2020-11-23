import constants from '../../constants';

const initState = {
  data: undefined,
}
const allCategoryReducer = (state = initState, action) => {
  switch (action.type){
    case constants.ALL_CATEGORY:
      return{
        ...state,
        data: action.playLoad,
      }
    default:
      return state;
  }
}
export default allCategoryReducer;
