import constants from '../constants';

const SignInAction = (data) => {
    return{
        type: constants.SIGN_IN,
        playLoad: data,
    }
}
const on_SignInAction = (data) => {
    return{
        type: constants.ON_SIGNIN,
        playLoad: data,
    }
}
export {SignInAction, on_SignInAction};
