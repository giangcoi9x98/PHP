import React, { Component } from 'react';
import Item from './Items';
import { withRouter } from 'react-router-dom';
import api from '../../../api';

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
      </div>
    );
  }
}

export default withRouter(index);
