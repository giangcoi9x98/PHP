import React, { Component } from 'react';
import api from '../../../api';
import { Box, Container, Button, Grid, makeStyles } from '@material-ui/core';
import ProductCard from './Items';
import { Pagination } from '@material-ui/lab';
import { withRouter } from 'react-router-dom';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      total: 0,
      page: 1,
      size: 0,
    };
  }
  async fetchData() {
    try {
      const res = await api.product.getAllProduct({
        page: this.state.page,
      });
      console.log(res.data.data);

      if (res.status) {
        this.setState({
          products: res.data.data,
          total: res.data.total,
          size: res.data.per_page,
        });
        console.log('props: ', this.state.listProduct, this.state.total);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    await this.fetchData();
  }
  handlePageChange = async (event, value) => {
    await this.setState({
      page: value,
    });
    await this.fetchData();
  };
  handleCreate = () => {
    this.props.history.push('/product/create');
  };
  render() {
    return (
      <div style={{ paddingTop: '1%' }}>
        <Container maxWidth={false}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={this.handleCreate}
              color="primary"
              variant="contained"
            >
              Add product
            </Button>
          </Box>
          <Box mt={3}>
            <Grid container spacing={3}>
              {this.state.products.map((product) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box mt={3} style={{ justifyContent: 'center', display: 'flex' }}>
            <Pagination
              color="primary"
              count={Math.ceil(this.state.total / this.state.size)}
              size="small"
              onChange={this.handlePageChange}
            ></Pagination>
          </Box>
        </Container>
      </div>
    );
  }
}

export default withRouter(index);
