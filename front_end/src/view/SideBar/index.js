import React, { Component } from 'react';
import {
  makeStyles,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  Grid,
} from '@material-ui/core';
import Category from '../../component/Category';
import api from '../../api';
import { Link } from 'react-router-dom';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategoryId: [],
      page: 1,
      size: 10,
    };
  }

  fetchData = async () => {
    try {
      const res = await api.category.getAllcategoryId({
        page: this.state.page,
      });

      if (res.status) {
        await this.setState({
          listCategoryId: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }
  render() {
    return (
      <div style={{ paddingTop: 20 }}>
        {this.state.listCategoryId.map((category) => (
          <Category key={category.categoryId} category={category}></Category>
        ))}
      </div>
    );
  }
}
