import React, { useState, Component } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { Switch, Route, BrowserRouter, Link, Redirect } from 'react-router-dom';
import HomePage from './view/HomePage';
import NotFound from './view/NotFound';
import Order from './view/Order';
import Detail from './view/Detail/index';
import DefaultLayout from './layout/Default';
import User from './layout/User';
import Account from './view/Account/index';
import Cart from './view/Cart/index';
import Checkout from './view/Checkout/index';
import Customer from './view/Admin/Customer/index';
import Product from './view/Admin/Product/index';
import CreateProduct from './view/Admin/Product/createProduct';
import Orders from './view/Admin/Order/index';
import OrderUpdate from './view/Admin/Order/Detail';
import Search from './view/Search/index';
import SearchLayout from './layout/SearchLayout'
import UpdateProduct from './view/Admin/Product/updateProduct'
export default class App extends Component {
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
