
import constants from '../constants';

export function showModal() {
    return {
        type: constants.SHOW_MODAL,
        payload:true
    }
}
export function closeModal() {
    return {
        type: constants.CLOSE_MODAL,
        payload:false
    }
}
export function showSignInModal() {
    return {
        type: constants.SHOW_SIGNIN_MODAL,
        payload:true
    }
}
export function showSignUpModal() {
    return {
        type: constants.SHOW_SIGNUP_MODAL,
        payload:false
    }
}
