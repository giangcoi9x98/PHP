import React, { Component } from 'react';
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Link as Direct,
  FormControlLabel,
  Checkbox,
  Dialog,
  Modal,
  Typography,
  Drawer,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, Redirect } from 'react-router-dom';
import {
  DialerSip,
  Face,
  Fingerprint,
  Lock,
  HighlightOff,
  Clear,
} from '@material-ui/icons';
import api from '../../api';
import Cookie from 'js-cookie';
import axios from 'axios';
import { connect } from 'react-redux';
import { showModal, closeModal } from '../../store/actions/modalAction';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sign: false,
      login: false,
      token: Cookie.get('token'),
      username: '',
      password: '',
    };
  }
  handleSignIn = async () => {
    try {
      const data = await api.auth.logIn({
        username: this.state.username,
        password: this.state.password,
      });

      Cookie.set('token', data.data.token, { expires: 365 });
      await this.setState({
        login: true,
      });
      if (data.status) {
        window.location = '/';
        this.props.closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    if (this.state.login) {
      return <div>{}</div>;
    }
    const { classes } = this.props;
    return (
      <Card
        style={{
          
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <CardContent
          style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              width: '100%',
              marginTop: '4%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              style={{
                width: '20%',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              Tài khoản
            </Typography>
            <TextField
              style={{ width: '80%' }}
              variant="outlined"
              label="Tài khoản"
              name="username"
              onChange={this.handleChange}
            ></TextField>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              marginTop: '4%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              style={{
                width: '20%',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              Mật khẩu
            </Typography>

            <TextField
              style={{ width: '80%' }}
              variant="outlined"
              label="Mật khẩu"
              name="password"
              onChange={this.handleChange}
              type="password"
            ></TextField>
          </div>
        </CardContent>
        <CardActions
          style={{
            marginTop: '3%',
            width: '90%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            style={{ width: '80%', display: 'flex' }}
            variant="contained"
            color="primary"
            size="large"
            onClick={this.handleSignIn}
          >
            Đăng nhập
          </Button>
        </CardActions>
      </Card>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch(showModal()),
    closeModal: () => dispatch(closeModal()),
  };
};
export default withRouter(SignIn);
