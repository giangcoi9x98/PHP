import React, { Component } from 'react';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  ListItem,
  Icon,
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  AlertOctagon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from 'react-feather';
import {withRouter} from 'react-router-dom'
import SideBar from '../../SideBar';

 class index extends Component {
  render() {
    return (
      <Box
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          width: 200,
        }}
      >
        <Box
          p={4}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src="/static/images/avatars/avatar.png"
            style={{ width: 64, height: 64, cursor: 'pointer' }}
          ></Avatar>
          <Typography variant="h5" color="textPrimary">
            Giang Tran
          </Typography>
          <Typography color="textSecondary">CNTT2-K58</Typography>
        </Box>
        <Divider></Divider>
        <Box p={3}>
          <List>
            <Button
              style={{
                width: '100%',
                textTransform: 'none',
                justifyContent: 'left',
                padding: '10px 8px',
                color: 'GrayText',
              }}
              href="/"
            >
              <BarChartIcon size={20}></BarChartIcon>
              <Typography style={{ paddingLeft: 5 }}>Home</Typography>
            </Button>
            <Button
              onClick={()=>this.props.history.push('/customer')}
              style={{
                width: '100%',
                textTransform: 'none',
                justifyContent: 'left',
                padding: '10px 8px',
                color: 'GrayText',
              }}
            >
              <UsersIcon size={20}></UsersIcon>
              <Typography style={{ paddingLeft: 5 }}>Customers</Typography>
            </Button>
            <Button
              onClick={()=>this.props.history.push('/product')}
              style={{
                width: '100%',
                textTransform: 'none',
                justifyContent: 'left',
                padding: '10px 8px',
                color: 'GrayText',
              }}
            >
              <ShoppingBagIcon size={20}></ShoppingBagIcon>
              <Typography style={{ paddingLeft: 5 }}>Products</Typography>
            </Button>
            <Button
              style={{
                width: '100%',
                textTransform: 'none',
                justifyContent: 'left',
                padding: '10px 8px',
                color: 'GrayText',
              }}
            >
              <UserIcon size={20}></UserIcon>
              <Typography style={{ paddingLeft: 5 }}>Account</Typography>
            </Button>
            <Button
              style={{
                width: '100%',
                textTransform: 'none',
                justifyContent: 'left',
                padding: '10px 8px',
                color: 'GrayText',
              }}
            >
              <SettingsIcon size={20}></SettingsIcon>
              <Typography style={{ paddingLeft: 5 }}>Settings</Typography>
            </Button>
            <Button
              style={{
                width: '100%',
                textTransform: 'none',
                justifyContent: 'left',
                padding: '10px 8px',
                color: 'GrayText',
              }}
            >
              <AlertCircleIcon size={20}></AlertCircleIcon>
              <Typography style={{ paddingLeft: 5 }}>Errors</Typography>
            </Button>
          </List>
        </Box>
      </Box>
    );
  }
}

export default withRouter(index)