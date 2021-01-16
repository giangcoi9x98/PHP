import { Card, Typography } from '@material-ui/core';
import React, { Component } from 'react';

export default class item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const priceIn = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
    }).format(this.props.orders.priceOut);
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <img
          style={{ width: '25%', height: '100%' }}
          src={this.props.orders.imageUrl}
        ></img>
        <div style={{ width: '75%' }}>
          <Typography style={{ fontSize: 15 }}>
            {this.props.orders.display}
          </Typography>
          <Typography style={{ fontSize: 10, color: 'rgb(132, 135, 136' }}>
            Số lượng {this.props.orders.orderCount}
          </Typography>
          <Typography>{priceIn}</Typography>
        </div>
      </div>
    );
  }
}
