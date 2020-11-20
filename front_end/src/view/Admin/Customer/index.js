import React, { Component } from 'react';
import Item from './Items';
import { Box} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import api from '../../../api';
import { Pagination } from '@material-ui/lab';


class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAccount: [],
    };
  }
  async fetchData() {
    try {
      const res = await api.account.getAll();
      if (res.status === true) {
        await this.setState({
          listAccount: res.data.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    
    return (
      <div style={{paddingTop:'1%'}}>
        <Item customers={this.state.listAccount}></Item>
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

export default withRouter(index);
