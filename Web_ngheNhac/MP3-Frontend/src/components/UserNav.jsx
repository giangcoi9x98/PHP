import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { NavDropdown } from "react-bootstrap"

class UserNav extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log("user o component: ",this.props.user)
        return (
            <div className="profile-container">
                {
                    this.props.user.logined ?
                        (
                            this.props.user.data &&
                            <div className="profile-content">
                                <Link to={`/user/${this.props.user.data.id}`}>
                                    <img alt={this.props.user.data.name} src={this.props.user.data.avatar} className="avatar"></img>
                                    <span>Hieu</span>
                                </Link>

                                <NavDropdown id="dropdown-menu-align-right" alignRight className="navbar-inverse">
                                    <NavDropdown.Item onClick={this.props.handleLogOut} >Đăng xuất</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        )
                        :
                        (
                            <Link to="/login">
                                Đăng nhập
                            </Link>
                        )
                }
            </div>
        );
    }
}

export default UserNav;