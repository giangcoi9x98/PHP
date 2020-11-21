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
          component: Product,
          layout: DefaultLayout,
          path: '/product',
        },
        {
          component: CreateProduct,
          layout: DefaultLayout,
          path:'/product/create'
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
          component: Detail,
          layout: DefaultLayout,
          path: `/detail/:id`,
        },
        {
          component: Order,
          layout: DefaultLayout,
          path: `/order`,
        },
        {
          component: Cart,
          layout: DefaultLayout,
          path: `/order/cart`,
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
