import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

class SignUp extends Component {

    constructor(props){
        super(props)
        // this.handleChange = this.handleChange.bind(this)
    }

    // handleChange = event => {
    //     console.log("id: ", [event.target.id], "value: ", event.target.value)
       
    // }

    render() {
        return (
            <div className="Login">
                <h3>Đăng ký tài khoản</h3>
                <br />
                <form onSubmit={this.props.handleSubmit} >
                    <FormGroup controlId="username" bsSize="large">
                        <FormLabel>Tên đăng nhập</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            onChange={this.props.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="name" bsSize="large">
                        <FormLabel>Tên</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            onChange={this.props.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl
                            type="password"
                            onChange={this.props.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="re_password" bsSize="large">
                        <FormLabel>Nhập lại mật khẩu</FormLabel>
                        <FormControl
                            autoFocus
                            type="password"
                            onChange={this.props.handleChange}
                        />
                    </FormGroup>
                    <p style={{ color: 'red' }}>{this.props.failMess}</p>
                    <br />
                    <Button
                        className="button"
                        block
                        // disabled={!this.validateForm()}
                        type="submit"
                    >
                        Đăng ký
                    </Button>
                </form>
            </div>
        );
    }
}

export default SignUp;