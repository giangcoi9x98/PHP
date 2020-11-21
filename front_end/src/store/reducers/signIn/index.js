import constants from '../../constants';

const initState = {

}
const SignReduxcer = (state = initStatem, action) => {
    switch (action.type){
        case constants.SIGN_IN:
            return{
                ...initState,
                data: action.playLoad,
            }
        default:
            return state;
    }
}
export default SignReduxcer;
