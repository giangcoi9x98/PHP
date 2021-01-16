export const SHOW_MODAL = 'SHOW_MODAL';
export const CLOSE_MODAL = 'SHOW_MODAL';
export const SHOW_SIGNIN_MODAL = 'SHOW_SIGNIN_MODAL';
export const SHOW_SIGNUP_MODAL = 'SHOW_SIGNUP_MODAL';


export function showModal() {
    return {
        type: SHOW_MODAL,
        payload:true
    }
}
export function closeModal() {
    return {
        type: CLOSE_MODAL,
        payload:false
    }
}
export function showSignInModal() {
    return {
        type: SHOW_SIGNIN_MODAL,
        payload:true
    }
}
export function showSignUpModal() {
    return {
        type: SHOW_SIGNUP_MODAL,
        payload:false
    }
}