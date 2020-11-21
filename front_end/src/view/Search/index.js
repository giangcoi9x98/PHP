import React, { Component, useEffect, useState } from 'react';
import api from '../../api';
import { makeStyles } from '@material-ui/core/styles';
import SearchAppBar from '../../component/SearchAppBar';
import { connect } from 'react-redux';
import Items from './Items';
import { Grid, Box, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  typo: {
    paddingTop: '2%',
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center'
  },
  textDesciption: {
    fontSize: 24,
    fontWeight: 300,
  },
  pagination: {
    justifyContent: 'center',
    display: 'flex',
  },
  textResult: {
    fontWeight: 300,
    fontSize: 24,
    color: '#898989',
  },
}));

function Index(props) {
  const classes = useStyles();
  const [products, setproducts] = useState([]);
  const [page, setpage] = useState(1);
  const [total, settotal] = useState(0);
  const [size, setsize] = useState(0);
  const [keyword, setkeyword] = useState(props.product.key);
  useEffect(() => {
    const fetchData = async (keyword, page) => {
      try {
        const res = await api.search.search(keyword, page);
        if (res.status) {
          await setproducts(res.data.data);
          await settotal(res.data.total);
          await setsize(res.data.per_page);
        }
      } catch (e) {
        console.log(e);
      }
    };
    setkeyword(props.product.key);
    fetchData(props.product.key, page);
  }, [props.product.key, page]);

  const handlePageChange = async (event, value) => {
    await setpage(value);
    props.history.push(`/search/${props.product.key}?page=${value}`);
  };
  return (
    <div>
      <SearchAppBar></SearchAppBar>
      <div className={classes.typo}>
        <Typography className={classes.textDesciption}>
          Kết quả tìm kiếm cho `{props.product.key}` :
        </Typography>
        <Typography className={classes.textResult}>{total} kết quả</Typography>
      </div>
      <Items products={products}></Items>
      <Box mt={3} className={classes.pagination}>
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
const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
export default withRouter(connect(mapStateToProps)(Index));
