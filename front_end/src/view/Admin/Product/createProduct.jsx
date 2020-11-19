import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CreateItem from './createItem';
class createProduct extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CreateItem></CreateItem>
      </div>
    );
  }
}
export default withRouter(createProduct);
