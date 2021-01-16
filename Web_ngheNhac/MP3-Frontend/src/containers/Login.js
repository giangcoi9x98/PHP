import React, { useState, useEffect } from "react"
import LoginUI from "../components/Login"
import { withRouter, Redirect } from "react-router-dom"
import { connect, useSelector, useDispatch } from "react-redux"
import { loginAction, getMe } from "../actions/auth"

const Login = (props) => {

    //map cac action
    const dispatch = useDispatch()
    //map state cua reducer voi state cua component
    const user = useSelector(state => state.auth)

    const [userAccount, setUserAccount] = useState({
        username: "",
        password: ""
    })

    function handleChange(event) {
        const { id, value } = event.target
        setUserAccount(preState => ({
            ...preState,
            [id]: value
        }))
        console.log(userAccount)
    }


    function handleSubmit(event) {
        event.preventDefault()
        console.log("Chay ne")
        dispatch(loginAction({
            username: userAccount.username,
            password: userAccount.password
        }))
        // dispatch(getMe())
    }


    if (user.logined) {
        return (
            <Redirect to="/" />
        )
    } else {
        return (
            <LoginUI handleSubmit={handleSubmit} handleChange={handleChange} />
        )
    }
}

export default withRouter(Login)