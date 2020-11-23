import React, { Component } from 'react';
import { Grid, Hidden, Drawer, Box, Modal, Fade } from '@material-ui/core';
import { connect } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import api from '../../api';
import SideBar from '../SideBar/index';
import AdminSideBar from '../Admin/SideBar/index';
import { withSnackbar, SnackbarProvider } from 'notistack';
import Product from './Product';
import TopBar from '../../component/SearchAppBar';
import { withRouter } from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [],
      total: 0,
      page: 1,
      size: 0,
      isShowSideBar: false,
      isCloseSideBar: true,
      isAdmin: false,
    };
  }

  async fetchData() {
    try {
      const res = await api.product.getAllProduct({
        page: this.state.page,
        //size: this.state.size,
      });
     

      if (res.status) {
        this.setState({
          listProduct: res.data.data,
          total: res.data.total,
          size: res.data.per_page,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  isCloseSideBar = async () => {
    await this.setState({ isShowSideBar: false });
  };
  async componentDidMount() {
    await this.fetchData(); 
  }

  handlePageChange = async (event, value) => {
    await this.setState({
      page: value,
    });
    await this.fetchData();
  };

  render() {
    const isAdmin = this.state.isAdmin;
    let sidebar;
    if (isAdmin === true) {
      sidebar = <AdminSideBar></AdminSideBar>;
    } else {
      sidebar = <SideBar></SideBar>;
    }

    return (
      <div>
        <TopBar
          isShowSideBar={() => this.setState({ isShowSideBar: true })}
          isAdmin={() => this.setState({ isAdmin: true })}
          test={(name) => this.setState({ test: name })}
        ></TopBar>

        <div style={{ display: 'flex' }}>
          <div>
            <Hidden lgUp>
              <Drawer
                open={this.state.isShowSideBar}
                onClose={this.isCloseSideBar}
              >
                {sidebar}
              </Drawer>
            </Hidden>
            <Hidden mdDown>{sidebar}</Hidden>
          </div>
          <div style={{ flexDirection: 'column', display: 'flex' }}>
            <Grid container>
              <Grid
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {this.state.listProduct.map((product) => {
                  return (
                    <Grid item xs={12} sm={6} md={3} key={product.productId}>
                      <Product key={product.productId} product={product}></Product>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </div>
        </div>
        <Box mt={3} style={{ justifyContent: 'center', display: 'flex' }}>
          <Pagination
            color="primary"
            count={Math.ceil(this.state.total / this.state.size)}
            size="small"
            onChange={this.handlePageChange}
          ></Pagination>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};
export default withRouter(connect(mapStateToProps)(HomePage));
