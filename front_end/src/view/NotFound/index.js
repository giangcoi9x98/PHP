import React, { Component } from 'react';
import SearchAppBar from '../utils/SearchAppBar';
import noti from '../../component/Notificator';
export default class NotFound extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <img src="static/images/not_found.png"></img>
      </div>
    );
  }
}
