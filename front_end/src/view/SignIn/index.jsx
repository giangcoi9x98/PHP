import React, {Component, useState} from 'react';
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
import { showModal, closeModal } from '../../store/actions/modalAction';
import {useDispatch} from "react-redux";
import actions from '../../store/actions';

const SignIn = (props) => {
// class SignIn extends Component {
   const dispatch = useDispatch();
   const [sign, setSign] = useState(false);
   const [login, setLogin] = useState(false);
   const [token, setToken] = useState(Cookie.get('token'));
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
  const handleSignIn = (ur, pw) => {
    dispatch(actions.on_SignInAction({ur, pw}));
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
                onClick={() => handleSignIn(username, password)}
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
