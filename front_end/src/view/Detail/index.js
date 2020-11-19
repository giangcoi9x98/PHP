import { Button } from '@material-ui/core';
import Axios from 'axios';
import React, { Component } from 'react';
import { useLocation } from 'react-router';
import api from '../../api';
import DetailProduct from './ProductDetail';
import SearchAppBar from '../utils/SearchAppBar';
export default class Detail extends Component {
  constructor(props) {
    super();
    this.state = {
      productId: window.location.pathname.split('/')[2],
      productDetail: {},
      key: [],
    };
  }

  fetchData = async () => {
    try {
      const res = await api.product.getProductById(this.state.productId);
      if (res.status) {
        this.setState({
          productDetail: res.data.data,
          key: res.data.data.url_key.split('-'),
        });
       
      }
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }
  render() {
    const propsDetail = {
      id: this.state.productId,
      detailProduct:this.state.productDetail
      
    }
    return (
      <div>
        <div style={{ padding: 20 }}>
          <DetailProduct
            propsDetail={propsDetail}
          ></DetailProduct>
        </div>
      </div>
    );
  }
}
