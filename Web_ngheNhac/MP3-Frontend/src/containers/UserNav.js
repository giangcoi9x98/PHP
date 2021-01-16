import React, { useState, useEffect } from "react"
import { withRouter, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { checkInit, getMe, logOut } from "../actions/auth"
import UserNavUI from "../components/UserNav"

const UserNav = (props) => {

    //dung action
    const dispatch = useDispatch()
    //map state cua component voi reducer store
    const user = useSelector(state => state.auth)

    // if(user.logined) {
    //     dispatch(getMe())
    // }

    useEffect(() => {
        dispatch(checkInit())
    },[]) // = compomentDidMount

    useEffect(()=> {
        if(!user.data && user.logined){
            dispatch(getMe())
        }
    }) // = componentDidUpdate

    function handleLogOut(){
        dispatch(logOut())
        window.location.reload()
    }

    return (
        // console.log(user)
        <UserNavUI handleLogOut={handleLogOut} user = {user}/>
        // <h4>loi ro</h4>
    )
}

export default UserNav