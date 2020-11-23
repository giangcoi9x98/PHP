import {
  Card,
  Divider,
  Grid,
  Typography,
  CardMedia,
  Hidden,
  Drawer,
  TextField,
  Button,
  ButtonGroup,
  Box,
} from '@material-ui/core';
import { addProduct, addCount } from '../../store/actions/countAction';
import { showModal } from '../../store/actions/modalAction';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Axios from 'axios';
import API from '../../api/api';
import React, { Component } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import SearchAppBar from '../../component/SearchAppBar';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import moment from 'moment';
import noti from '../../component/Notificator';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: [],
      listOrderProduct: [],
      isLogin: false,
      count: 1,
      orderProduct: {
        id: '',
        count: 0,
      },
      countBadge: 0,
    };
  }
  icCount = async () => {
    await this.setState({
      count: this.state.count + 1,
    });
  };
  dcCount = async () => {
    if (this.state.count > 1) {
      await this.setState({
        count: this.state.count - 1,
      });
    }
  };
  checkSignIn = async () => {
    try {
      const result = await API.get('http://localhost:8000/api/me');
      if (result.status === 200) {
        await this.setState({
          isLogin: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleChangeCount = (e) => {
    if (!isNaN(parseInt(e.target.value))) {
      this.setState({
        [e.target.name]: parseInt(e.target.value),
      });
      if (isNaN(parseInt(e.target.value))) {
        this.setState({
          count: '',
        });
      }
    } else if (isNaN(this.state.count)) {
      this.setState({
        count: '',
      });
    } else {
      this.setState({
        count: '',
      });
    }
  };
  handleOrder = async () => {
    if (this.state.isLogin) {
      try {
        await this.setState({
          orderProduct: {
            id: this.props.propsDetail.id,
            count: this.state.count,
          },
        });
        this.props.addCount(this.state.count);
        this.props.addProduct(this.state.orderProduct);

        noti.success('Đặt mua thành công!');
      } catch (e) {
        noti.error('Đặt mua thất bại');
      }
    } else {
      console.log(this.props);
      await this.props.showModal();
    }
  };
  async componentDidMount() {
    await this.checkSignIn();
  }

  render() {
    const priceIn = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
    }).format(this.props.propsDetail.detailProduct.priceIn);
    const priceOut = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'VND',
    }).format(this.props.propsDetail.detailProduct.priceOut);
    const percentSale =
      'Giảm -' +
      Math.ceil(
        (parseFloat(this.props.propsDetail.detailProduct.priceSale) /
          parseFloat(this.props.propsDetail.detailProduct.priceIn)) *
          100,
      );

    return (
      <Grid
        container
        style={{
          paddingTop: '2%',
          height: '100%',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Card
          style={{
            width: '85%',
            height: '100%',
            display: 'flex',
          }}
        >
          <div
            style={{
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                display: 'flex',
              }}
            >
              <Hidden mdDown>
                <CardMedia
                  style={{
                    height: 500,
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                  }}
                >
                  <img
                    src={this.props.propsDetail.detailProduct.imageUrl}
                    style={{ height: '80%', width: '80%' }}
                  ></img>
                  <div style={{ padding: '3%' }}>
                    <Typography>-CPU : Intel Core i5-10210U</Typography>
                    <Typography>-Màn hình :14" TN (1920 x 1080)</Typography>
                    <Typography>-RAM : 1 x 8GB DDR4 2666MHz</Typography>
                    <Typography>
                      -Đồ hoạ : Đồ họa: Intel UHD Graphics
                    </Typography>
                    <Typography>-Lưu trữ :256GB SSD M.2 NVMe /</Typography>
                    <Typography>-Hệ điều hành : Free DOS</Typography>
                    <Typography>-Pin :3 cell 48 Wh Pin liền</Typography>
                    <Typography>-Khối lượng:1.6 kg</Typography>
                  </div>
                </CardMedia>
              </Hidden>
            </div>
          </div>
          <div
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              width: '40%',
              flexDirection: 'column',
            }}
          >
            <Hidden mdDown >
              <Typography variant="h5" color="textPrimary">
                {this.props.propsDetail.detailProduct.display}
              </Typography>

              <div
                style={{
                  display: 'flex',
                  padding: 5,
                  paddingTop: 20,
                  height: '10%',
                  width: '100%',
                }}
              >
                <Typography variant="h5" color="textPrimary">
                  {priceOut}
                </Typography>
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
                    width: 90,
                    height: 8,
                    color: '#ff1744',
                  }}
                >
                  {percentSale}%
                </Typography>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <ButtonGroup >
                  <Button variant="outlined" onClick={this.dcCount}>
                    -
                  </Button>
                  <TextField
                    color="primary"
                    name="count"
                    variant="outlined"
                    onChange={this.handleChangeCount}
                    value={this.state.count}
                    style={{
                      width: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  ></TextField>
                  <Button variant="outlined" onClick={this.icCount}>
                    +
                  </Button>
                </ButtonGroup>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={this.handleOrder}
                >
                  Dat Mua
                </Button>
              </div>
            </Hidden>
          </div>
        </Card>
        <Card>
          <Hidden lgUp>
            <CardMedia>
              <img
                src={this.props.propsDetail.detailProduct.imageUrl}
                style={{ height: '90%', width: '90%' }}
              ></img>
            </CardMedia>
            <Typography>
              {this.props.propsDetail.detailProduct.display}
            </Typography>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6" style={{ color: '#c4001d' }}>
                {priceOut}
              </Typography>
              <Typography
                style={{
                  color: '#9e9e9e',
                  textDecoration: 'line-through',
                  marginLeft: 10,
                }}
              >
                {priceIn}
              </Typography>
            </div>
          </Hidden>
        </Card>
      </Grid>
    );
  }
}
const MapDicpatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(addProduct(product)),
    addCount: (count) => dispatch(addCount(count)),
    showModal: () => dispatch(showModal()),
  };
};
const MapStateToProps = (state) => {
  return {
    counts: state.counts,
    product: state.product,
  };
};
export default withRouter(
  connect(MapStateToProps, MapDicpatchToProps)(ProductDetail),
);
