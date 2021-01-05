import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CreateItem from './createItem';
class createProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:window.location.pathname.split('/')[3]
    }
  }
  render() {
  
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CreateItem id ={this.state.id}></CreateItem>
      </div>
    );
  }
}
export default withRouter(createProduct);
