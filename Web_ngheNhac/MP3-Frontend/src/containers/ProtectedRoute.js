import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const user = useSelector(state => state.auth)

    useEffect(() => {
        console.log("data o Protected: ", user)
    },[])

    return (
        
        <Route
            {...rest}
            render={props =>
                user.logined ?
                    <Component {...props} {...rest} />
                    :
                    <Redirect to="/login" />
            }
        />
    )
}

export default ProtectedRoute