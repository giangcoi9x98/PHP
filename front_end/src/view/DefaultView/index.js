import React, { useState, Component } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { Switch, Route, BrowserRouter, Link, Redirect } from 'react-router-dom';
import HomePage from '../HomePage';
import NotFound from '../NotFound';
import Order from '../Order';
import Detail from '../Detail/index';
import DefaultLayout from '../../layout/Default';
import User from '../../layout/User';
import Account from '../Account/index';
import Cart from '../Cart/index';
import Checkout from '../Checkout/index';
import Customer from '../Admin/Customer/index';
import Product from '../Admin/Product/index';
import CreateProduct from '../Admin/Product/createProduct';
import Orders from '../Admin/Order/index';
import OrderUpdate from '../Admin/Order/Detail';
import Search from '../Search/index';
import SearchLayout from '../../layout/SearchLayout'
import UpdateProduct from '../Admin/Product/updateProduct'
export default class HomeDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routers: [
        {
          component: HomePage,
          layout: DefaultLayout,
          // layout: Cookie.get(`token`) ? Normal : Normal,
          path: `/`,
        },
        {
          component: Checkout,
          layout: DefaultLayout,
          path: '/order/checkout',
        },
        {
          component: Order,
          layout: DefaultLayout,
          path: `/order/detail`,
        },
        {
          component: OrderUpdate,
          layout: DefaultLayout,
          path: `/order/update/:id`,
        },
        {
          component: Cart,
          layout: DefaultLayout,
          path: `/order/cart`,
        },
        {
          component: Orders,
          layout: DefaultLayout,
          path: `/order`,
        },
        {
          component: Product,
          layout: DefaultLayout,
          path: '/product',
        },
        {
          component: CreateProduct,
          layout: DefaultLayout,
          path: '/product/create',
        },
        {
          component: UpdateProduct,
          layout: DefaultLayout,
          path:'/update/:id'
        },
        {
          component: Customer,
          layout: DefaultLayout,
          path: '/customer',
        },
        {
          component: Account,
          layout: User,
          path: `/me`,
        },
        {
          component: Search,
          layout:SearchLayout,
          path:'/search/:params'
        },
        {
          component: Detail,
          layout: DefaultLayout,
          path: `/detail/:id`,
        },
        {
          component: NotFound,
          layout: DefaultLayout,
          path: '/not-found',
        },
      ],
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Grid
          style={{
            display: `flex`,
            flexDirection: `column`,
            height: `100%`,
          }}
        >
          <Grid
            style={{
              flexDirection: `row`,
              alignItems: `stretch`,
              flex: 1,
            }}
          >
            <Switch>
              {this.state.routers.map((e) => (
                <Route exact path={e.path}>
                  <e.layout>
                    <e.component />
                  </e.layout>
                </Route>
              ))}
              <Route exact path="not-found">
                {NotFound}
              </Route>
              <Redirect from="/" to="/not-found">
                {` `}
              </Redirect>
            </Switch>
          </Grid>
        </Grid>
      </BrowserRouter>
    );
  }
}
