import constants from '../../constants';

function counts(state = [], action) {
  switch (action.type) {
    case constants.ADD_COUNT:
      return {
        ...state,
        total: state.total + action.payload,
      };
    case constants.INCREMENT:
      return {
        ...state,
        total:state.total+1
      }
    case constants.DECREMENT:
      return {
        ...state,
        total:state.total-1
      }
    default:
      return state;
  }
}

export default counts;
