import React, { Component } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Image from 'material-ui-image';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
    };
  }
  handleOrder = async () => {
    await this.setState({
      productId: this.props.product.productId,
    });
    this.props.history.push(`/detail/${this.state.productId}`);
  };
  render() {
    const priceIn = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
    }).format(this.props.product.priceIn);
    const priceOut = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
    }).format(this.props.product.priceOut);
    const percentSale =
      'Giảm -' +
      Math.ceil(
        (parseFloat(this.props.product.priceSale) /
          parseFloat(this.props.product.priceIn)) *
          100,
      );
    return (
      <div style={{}}>
        <Card
          onClick={this.handleOrder}
          style={{
            margin: 5,
            maxHeight: 470,
            minHeight: 470,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardMedia
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <img src={this.props.product.imageUrl}></img>{' '}
          </CardMedia>

          <CardContent>
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              align="center"
              display="initial"
            >
              {this.props.product.display}
            </Typography>
          </CardContent>
          <CardActions
            style={{
              justifyContent: 'center',
              display: 'flex',
           
            }}
          >
            <div
              style={{
                justifyContent:'space-around',
                display: 'flex',
                height: '10%',
                width: '100%',
              }}
            >
              <Typography variant="h6" color="textPrimary">
                {priceOut}
              </Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  style={{
                    textDecoration: 'line-through',
                    color: '#9e9e9e',
                    marginLeft: 20,
                    marginTop: 8,
                  }}
                >
                  {priceIn}
                </Typography>
                <Typography
                  style={{
                    marginLeft: 10,
                    marginTop: 8,
                    height: 8,
                    color: '#ff1744',
                  }}
                >
                  {percentSale}%
                </Typography>
              </div>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default withRouter(Product);
