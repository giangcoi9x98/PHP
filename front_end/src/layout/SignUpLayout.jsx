import React, { Component } from 'react'
import SeacrchAppBar from '../view/utils/SearchAppBar'


export default class SignUpLayout extends Component {
    render() {
        return (
            <div style={{flex:1,height:'100%'}}>               
                <main style={{flexDirection:'column',height:'100%'}}> 
                    <SeacrchAppBar></SeacrchAppBar>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
