import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel, Modal } from "react-bootstrap"
import { Redirect, Link } from "react-router-dom"



class Login extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="login" >
                <form onSubmit = {this.props.handleSubmit} > 
                    <FormGroup controlId="username" bsSize="large" >
                        <FormLabel>Tên đăng nhập</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            onChange={this.props.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl
                            autoFocus
                            type="password"
                            onChange={this.props.handleChange}
                        />
                    </FormGroup>
                    <Button
                        className="button"
                        block
                        type="submit"
                    >
                        Login
                     </Button>
                    <p>Thông báo sau này để ở đây</p>

                </form>
                <div style={{ justifyContent: "center", display: "flex", marginTop: "30px" }} >
                    <p>Nếu bạn chưa có tài khoản: </p>
                    <Link to="/signup" ><span>Bấm vào đây đi ạ</span></Link>
                </div>
            </div>
        );
    }
}

export default Login;