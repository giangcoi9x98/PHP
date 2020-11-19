import { Button, Card, CardMedia, Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import orderLocalStorage from '../../utils/orderLocalStorage';
import Axios from 'axios';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOrders: [],
      totalBill: 0,
    };
  }
  handleBackHome = () => {
    window.location = '/';
  };

  async fetchData() {
    const listOrders = [];
    let newObj = {};
    let total = 0;
    this.props.product.listOrderProduct.map((obj) =>
      fetch(` http://127.0.0.1:8000/api/product/${obj.id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            newObj = { ...result, orderCount: obj.count };
            listOrders.push(newObj);
            total += newObj.priceOut * obj.count;
            this.setState({
              listOrders: listOrders,
              totalBill: total,
            });
          },
          (err) => {
            console.log(err);
          },
        ),
    );
  }
  async handleOrder() {
    // const orders = JSON.parse(localStorage.getItem('order'));
    // const res = await api.order.createOrder({ orders });
    // console.log(res);
    window.location='/order/checkout';
  }
  async componentDidMount() {
    await this.fetchData();
  }
  render() {
    console.log(this.state.listOrders)
    console.log(this.props.product)
    const totalBill = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
    }).format(this.state.totalBill);
    if (this.props.product.listOrderProduct.length === 0) {
      return (
        <div
          style={{
            paddingTop: 20,
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card style={{ height: '100%', width: '100%' }}>
            <div
              style={{
                height: '80%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <img src="https://i.imgur.com/Drj57qu.png"></img>
              <Typography color="textSecondary">
                Giỏ hàng chưa có sản phẩm nào
              </Typography>
              <Button
                onClick={this.handleBackHome}
                style={{
                  backgroundColor: '#3f51b5',
                  color: '#FFFFFF',
                  margin: '2%',
                }}
              >
                Mua sắm ngay
              </Button>
            </div>
          </Card>
        </div>
      );
    } else {
      return (
        <Grid
          container
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Grid style={{ width: '70%', paddingTop: '5%', paddingLeft: '5%' }}>
            {this.state.listOrders.map((orders) => {
              return (
                <Grid>
                  <CartItem
                    orders={orders}
                    totalBill={(cost) =>
                      this.setState({
                        totalBill: this.state.totalBill + parseInt(cost),
                      })
                    }
                  ></CartItem>
                </Grid>
              );
            })}
          </Grid>
          <div style={{ width: '20%', paddingLeft: '1%', paddingTop: '5%' }}>
            <Card
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                height: '8%',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="inherit"
                style={{ color: 'rgb(51, 51, 51)' }}
              >
                Tạm tính
              </Typography>
              <Typography>{totalBill}</Typography>
            </Card>
            <Card
              style={{
                marginTop: '4%',
                alignItems: 'center',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                height: '10%',
              }}
            >
              <Typography>Thành tiền</Typography>
              <Typography variant="h6" style={{ color: 'rgb(254, 56, 52)' }}>
                {totalBill}
              </Typography>
            </Card>
            <Button
              onClick={this.handleOrder}
              style={{
                marginTop: '4%',
                width: '100%',
                backgroundColor: 'rgb(255, 66, 78)',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgb(255, 255, 255)',
              }}
            >
              Tiến hành đặt mua
            </Button>
          </div>
        </Grid>
      );
    }
  }
}
const MapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
export default withRouter(connect(MapStateToProps)(Cart));
