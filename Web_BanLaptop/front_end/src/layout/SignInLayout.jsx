import React, { Component } from 'react'
import SeacrchAppBar from '../view/utils/SearchAppBar'
import { Box } from '@material-ui/core'
import SignInForm from '../view/SignIn/index'
export default class SignIn extends Component {
    render() {
        return (
            <div style={{ flex: 1, height: '100%'  }}>
                <SeacrchAppBar></SeacrchAppBar>
                <main style={{ flex: 1, height: '100%',alignItems:'center',justifyContent:'center' }}>
                    <SignInForm></SignInForm>
                </main>
            </div>
        )
    }
}

