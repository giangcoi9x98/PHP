import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { axiosApi } from "../utils/axios"
import SignUpUI from "../components/SignUp"

const SignUp = (props) => {

    const [userAccount, setUserAccount] = useState({
        username: "",
        name: "",
        password: "",
        re_password: ""
    })

    const [failMess, setFailMess] = useState("")

    function handleChange(event) {
        const { id, value } = event.target
        setUserAccount(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    function handleErrorSignUp(code){
        if (code === 401) {
            setFailMess("Vui lòng nhập lại password ạ")
        } else {
            setFailMess("Lỗi này dev em chưa xử lý được ạ")
        }
    }

    function handleSubmit(event) {
        console.log(userAccount.username)
        event.preventDefault()
        axiosApi.post("/auth/signup", {
            username: userAccount.username,
            name: userAccount.name,
            password: userAccount.password,
            rePassword: userAccount.re_password
        }).then((result) => {
            console.log(result)
            if(result.data.code === 200){
                props.history.push("/login?signup=success")
            }
        }).catch((error) => {
            handleErrorSignUp(error.response.status)
        })
    }

    return (
        <SignUpUI handleChange={handleChange} handleSubmit={handleSubmit} failMess={failMess} />
    )
}

export default withRouter(SignUp)
