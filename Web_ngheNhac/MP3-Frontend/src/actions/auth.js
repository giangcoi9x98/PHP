import axios from "axios"
import { axiosApi, axiosAuth } from "../utils/axios"
import localStorage from "localStorage"

export const LOGIN_START = "LOGIN_START"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const GET_ME = "GET_ME"
export const TOKEN_EXPIRED = "TOKEN_EXPIRED"
export const CHECK_INIT = "CHECK_INIT"
export const LOG_OUT = "LOG_OUT"

export const loginAction = ({ username, password }) => {
    console.log("action chay r ne ba: ", username, "   ", password)
    return dispatch => {
        dispatch(loginStart())
        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            username,
            password
        }).then(res => {
            console.log("res ne`: ", res)
            localStorage.setItem("token", res.data.token)
            dispatch(loginSuccess(res.data.token))
        }).catch(err => {
            console.log(err)
            dispatch(loginFail())
        })
    }
}

export const loginStart = () => ({
    type: LOGIN_START
})

export const loginSuccess = token => ({
    type: LOGIN_SUCCESS,
    payload: {
        token: token
    }
})

export const loginFail = () => ({
    type: LOGIN_FAIL,
    payload: {
        message: "Đăng nhập không thành công rồi ạ"
    }
})

export const getMe = () => {
    return async dispatch => {
        const axiosAu = await axiosAuth()
        axiosAu.get("/users/me")
            .then((result) => {
                console.log("axios call get me:", result)
                dispatch(getInfoUser(result.data))
            }).catch((err) => {
                if (err.response.status !== 200) {
                    dispatch(tokenExpired())
                }
            })
    }
}

export const getInfoUser = data => ({
    type: GET_ME,
    payload: {
        user: data
    }
})

export const tokenExpired = () => ({
    type: TOKEN_EXPIRED,
    payload: {
        data: false,
        logined: false
    }
})

export const checkInit = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        if(token){
            dispatch(loginInit(token))
        }
    }
}

export const loginInit = (result) => ({
    type: CHECK_INIT,
    payload: {
        token: result
    }
})

export const logOut = () => {
    localStorage.removeItem("token")
    return dispatch => {
        return dispatch({
            type :LOG_OUT,
            payload: {
                data: false,
                logined: false
            }
        })
    }
}

