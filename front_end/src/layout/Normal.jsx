
import React, { Component } from 'react'
import SearchAppBar from '../view/utils/SearchAppBar'
import SideBar from '../view/SideBar/index'
export default class Normal extends Component {
    render() {
        return (
            <div style={{ flex: 1, display: 'flex', paddingTop: 50 }}> 
                <main style={{ display: 'flex' }}>
                     {this.props.children}
                </main>
            </div>
        )
    }
}
