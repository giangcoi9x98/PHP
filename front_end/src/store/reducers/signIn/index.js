import constants from '../../constants';

const initState = {
    data: undefined,
}
const signInReducer = (state = initState, action) => {
    switch (action.type){
        case constants.SIGN_IN:
            return{
                ...state,
                data: action.playLoad,
            }
        default:
            return state;
    }
}
export default signInReducer;
