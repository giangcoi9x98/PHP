import React, { Component } from 'react'
import SearchAppBar from '../view/utils/SearchAppBar'
export default class User extends Component {
    render() {
        return (
            <div style={{ flex: 1 }}>
                <main style={{}}>    
                    <SearchAppBar></SearchAppBar> 
                        {this.props.children}
                </main>
            </div>
        )
    }
}

