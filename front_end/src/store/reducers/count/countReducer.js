import { ADD_COUNT ,INCREMENT,DECREMENT} from '../../actions/countAction';

function counts(state = [], action) {
  switch (action.type) {
    case ADD_COUNT:
      return {
        ...state,
        total: state.total + action.payload,
      };
    case INCREMENT:
      return {
        ...state,
        total:state.total+1
      }
    case DECREMENT:
      return {
        ...state,
        total:state.total-1
      }
    
    default:
      return state;
  }
}

export default counts;
