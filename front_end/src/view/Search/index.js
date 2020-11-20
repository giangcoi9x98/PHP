import React, { Component, useEffect, useState } from 'react';
import api from '../../api';
import SearchAppBar from '../utils/SearchAppBar';
import { connect } from 'react-redux';
import Items from './Items';
import { Grid,Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

function Index(props) {
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
  }, [props.product.key,page]);
  
  const handlePageChange = async (event, value) => {
    await setpage(value)
   
  };
  return (
    <div>
      <SearchAppBar></SearchAppBar>
      
        <Items products={products}></Items>
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
const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
export default connect(mapStateToProps)(Index);
