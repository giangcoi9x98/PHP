import React, { Component, useEffect, useState } from 'react';
import {ToastProvider ,useToasts } from 'react-toast-notifications';
import {useSelector} from 'react-redux';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import api from '../../api';
import Cookie from 'js-cookie';
import {useDispatch} from "react-redux";
import actions from '../../store/actions';
import noti from '../../component/Notificator';
const SignIn = (props) => {
// class SignIn extends Component {
  const dispatch = useDispatch();
  const [sign, setSign] = useState(false);
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState(Cookie.get('token'));
  const [logined, setLogined] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const respLogin = useSelector((state) => state?.signInReducer);
  useEffect(() => {
    console.log(respLogin);
    try{
      Cookie.set('token', respLogin.data.data.token, { expires: 365 });
      if (respLogin.data.status === 200) {
        noti.success('Đăng nhập thành công');
        window.location = '/';
        dispatch(actions.closeModal());
      }
      else{
        noti.error('Sai tài khoản hoặc mật khẩu!');
      }
    }
    catch(err){
      if(logined === true)
        noti.error('Sai tài khoản hoặc mật khẩu!');
      console.log(respLogin);
    }
  }, [respLogin]);
  const handleSignIn = (ur, pw) => {
    dispatch(actions.on_SignInAction({username: ur, password: pw}));
  };

  if (login) {
    return <div>{}</div>;
  }
  else{
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
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
            onClick={() => {
              handleSignIn(username, password);
              setLogined(true);
            }}
          >
            Đăng nhập
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(SignIn);
