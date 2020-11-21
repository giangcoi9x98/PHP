import React, { Component } from 'react'
import SearchAppBar from '../component/SearchAppBar'

export default class Default extends Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                   <SearchAppBar ></SearchAppBar> 
                <main style={{paddingTop:50,height:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'rgb(241, 240, 241)'}}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
