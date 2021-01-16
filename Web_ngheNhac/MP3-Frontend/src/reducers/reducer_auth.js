import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, GET_ME, TOKEN_EXPIRED,CHECK_INIT,LOG_OUT } from "../actions/auth"

export default function (state = { logined: false, data: false }, action) {
    console.log("action ne: ", action)
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, logined: action.payload }
        case LOGIN_FAIL:
            return {...state, loginFail: action.payload.message }
        case GET_ME :
            return {...state, data: action.payload.user}
        case TOKEN_EXPIRED : 
            return {...state, data: action.payload.data, logined: action.payload.logined}
        case CHECK_INIT :
            return {...state, logined: action.payload}
        case LOG_OUT :
            return {...state, data: action.payload.data, logined: action.payload.logined}
        default:
            return state;
    }
}