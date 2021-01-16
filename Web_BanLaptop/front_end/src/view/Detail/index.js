import React, { Component } from 'react';
import api from '../../api';
import DetailProduct from './ProductDetail';
export default class Detail extends Component {
  constructor(props) {
    super(props);
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
        await this.setState({
          productDetail: res.data.data.data,
        });
        this.setState({
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
      detailProduct: this.state.productDetail,
    };
    return (
      <div>
        <div>
          <DetailProduct propsDetail={propsDetail}></DetailProduct>
        </div>
      </div>
    );
  }
}
