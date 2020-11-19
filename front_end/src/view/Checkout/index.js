import {
  Grid,
  Card,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Item from './Item';
import { connect } from 'react-redux';
import api from '../../api/index';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOrders: [],
      address: '',
      note: '',
      type: 'home',
      totalBill: 0,
    };
  }
  handleChangeOption = (event) => {
    this.setState({
      type: event.target.value,
    });
  };
  handeChangeText = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state.address);
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
  handleOrder = async () => {
    const orders = JSON.parse(localStorage.getItem('order'));
    const note = this.state.note;
    const address = this.state.address;
    const type = this.state.type;
    const price = this.state.totalBill;
    try {
      const res = await api.order.createOrder({
        orders,
        note,
        address,
        type,
        price,
      });
        if (res.data.status === 200) {
            localStorage.removeItem('order');
            window.location='/order/cart'
        }
    } catch (e) {
        console.log(e);
    }
  };
  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    const totalBill = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
    }).format(this.state.totalBill);
    return (
      <div style={{ display: 'flex', width: '100%' }}>
        <Card
          style={{ margin: '4%', width: '55%', display: 'flex', padding: '2%' }}
        >
          <FormControl component="fieldset" style={{ width: '60%' }}>
            <FormLabel component="legend" style={{ fontSize: 20 }}>
              Thông tin giao hàng{' '}
            </FormLabel>
            <RadioGroup
              style={{ margin: '2%', padding: '2%', width: '100%' }}
              aria-label="gender"
              name="gender1"
              value={this.state.type}
              onChange={this.handleChangeOption}
            >
              <FormControlLabel
                value="store"
                control={<Radio />}
                label="Giao hàng tận nơi"
              />
              <TextField
                style={{ width: '100%' }}
                name="address"
                value={this.state.address}
                id="outlined-basic"
                label="Địa chỉ nhận hàng"
                type="text"
                variant="outlined"
                onChange={this.handeChangeText}
              />{' '}
              <TextField
                style={{ paddingTop: '3%' }}
                name="note"
                value={this.state.note}
                id="outlined-basic"
                label="Ghi chú đơn hàng "
                type="text"
                variant="outlined"
                onChange={this.handeChangeText}
              />
              <FormControlLabel
                value="home"
                control={<Radio />}
                label="Nhận tại cửa hàng "
              />
            </RadioGroup>
          </FormControl>
        </Card>
        <Grid
          style={{
            display: 'flex',
            width: '35%',
            flexDirection: 'column',
            margin: '4%',
          }}
        >
          {this.state.listOrders.map((orders) => {
            return (
              <Card style={{ display: 'flex', width: '100%' }}>
                <Item orders={orders}></Item>
              </Card>
            );
          })}
          <div style={{ width: '100%', paddingLeft: '1%', paddingTop: '5%' }}>
            <Card
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                height: '30%',
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
                alignItems: 'center',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                height: '30%',
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
      </div>
    );
  }
}
const MapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
export default withRouter(connect(MapStateToProps)(Checkout));
