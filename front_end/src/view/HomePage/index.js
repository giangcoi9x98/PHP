import React, { Component, useState, useEffect } from 'react';
import { Grid, Hidden, Drawer, Box, Modal, Fade } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import api from '../../api';
import SideBar from '../SideBar/index';
import AdminSideBar from '../Admin/SideBar/index';
import { withSnackbar, SnackbarProvider } from 'notistack';
import Product from './Product';
import TopBar from '../../component/SearchAppBar';
import { withRouter } from 'react-router-dom';
import allProductReducer from '../../store/reducers/product';
import action from '../../store/actions';

const HomePage = (props) => {
  // const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // const [size, setSize] = useState(0);
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  const [isCloseSideBar, setIsCloseSideBar] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const dataResp = useSelector((state) => state?.allProductReducer);
  const total = useSelector((state)=>state?.allProductReducer?.data?.data?.total);
  const size = useSelector((state)=>state?.allProductReducer?.data?.data?.per_page)
  console.log('total', total);
  console.log('size', size);
  console.log('datarep', dataResp);
  // try{
  //   if (dataResp.data.status) {
  //     setTotal(dataResp.data.data.total);
  //     setSize(dataResp.data.data.per_page);
  //     console.log('total', total);
  //     console.log('size', size);
  //   }
  // }catch (err){
  //
  // }
  const fetchData = (page) => {
    dispatch(action.get_Product({ page: page }));
  }
  useEffect(() => {
    try {
      fetchData(page);
    } catch (e) {
      console.log(e);
    }
  }, [page])

  const handlePageChange = (event, value) => {
    console.log('page', value);
    setPage(value);
  };

    let sidebar;
    if (isAdmin === true) {
      sidebar = <AdminSideBar></AdminSideBar>;
    } else {
      sidebar = <SideBar></SideBar>;
    }
    return (
      <div>
        <TopBar
          isShowSideBar={() => setIsShowSideBar(true)}
          isAdmin={() => setIsAdmin(true)}
        ></TopBar>

        <div style={{ display: 'flex' }}>
          <div style={{}}>
            <Hidden lgUp>
              <Drawer
                open={isShowSideBar}
                onClose={() => setIsShowSideBar(false)}
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
                {(dataResp.data != undefined && dataResp.data.status != false)?
                  dataResp.data.data.data.map((product) => {
                  return (
                    <Grid item xs={12} sm={6} md={3}>
                      <Product product={product}></Product>
                    </Grid>
                  );
                }): null}
              </Grid>
            </Grid>
          </div>
        </div>
        <Box mt={3} style={{ justifyContent: 'center', display: 'flex' }}>
          <Pagination
            color="primary"
            count={Math.ceil(total / size)}
            size="small"
            onChange={handlePageChange}
          ></Pagination>
        </Box>
      </div>
    );
}


export default withRouter(HomePage);
