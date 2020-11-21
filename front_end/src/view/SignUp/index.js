import React, { useState, useEffect } from 'react';
import {
  Link as RouterLink,
  Link,
  useNavigate,
  useHistory,
} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Grid,
  Card,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Page from '../HomePage/index';
import Axios from 'axios';
import api from '../../api';
import { connect, useDispatch } from 'react-redux';
import { showSignInModal } from '../../store/actions/modalAction';
import noti from '../../component/Notificator';

function SignUp() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState({});
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const data = await api.account.signUp({
        username: username,
        password: password,
        email: email,
        firstname: firstName,
        lastname: lastName,
      });
      console.log('signup', data.data.status);
      if (data.data.status === 201) {
        await setIsSignUp(true);
       noti.success('Tạo mới thành công!')
      }
    } catch (err) {
      noti.error('Tạo mới thất bại')
      console.log(err);
    }
  };

  const checkExists = (values) => {
    if (values) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Card
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
      container
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            username: '',
            policy: false,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
            firstName: Yup.string().max(255).required('First name is required'),
            lastName: Yup.string().max(255).required('Last name is required'),
            username: Yup.string().max(255).required('Username is required'),
            password: Yup.string().max(255).required('password is required'),
            policy: Yup.boolean().oneOf([true], 'This field must be checked'),
          })}
          onSubmit={() => {
            console.log('isSubmit');
          }}
        >
          {({
            errors,
            handleSubmit,
            handleChange,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                error={checkExists(firstName) && errors.firstName}
                fullWidth
                helperText={checkExists(firstName) && errors.firstName}
                label="First name"
                margin="normal"
                name="firstName"
                //onBlur={handleBlur}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                variant="outlined"
              />
              <TextField
                error={Boolean(checkExists(lastName) && errors.lastName)}
                fullWidth
                helperText={checkExists(lastName) && errors.lastName}
                label="Last name"
                margin="normal"
                name="lastName"
                //onBlur={handleBlur}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                variant="outlined"
              />
              <TextField
                error={Boolean(checkExists(email) && errors.email)}
                helperText={checkExists(email) && errors.email}
                fullWidth
                label="Email Address"
                margin="normal"
                name="email"
                //onBlur={handleBlur}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                variant="outlined"
              />
              <TextField
                error={Boolean(checkExists(username) && errors.username)}
                fullWidth
                helperText={checkExists(username) && errors.username}
                label="Username"
                margin="normal"
                name="username"
                //onBlur={handleBlur}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                variant="outlined"
              />
              <TextField
                error={Boolean(checkExists(password) && errors.password)}
                fullWidth
                helperText={checkExists(password) && errors.password}
                label="Password"
                margin="normal"
                name="password"
                // onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                variant="outlined"
              />

              {/* {Boolean(touched.policy && errors.policy) && (
                <FormHelperText error>{errors.policy}</FormHelperText>
              )} */}
              <Box my={2}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleSignUp}
                >
                  Tạo tài khoản
                </Button>
              </Box>
              <Box style={{ display: 'flex' }}>
                <Typography color="textPrimary" variant="body1">
                  Bạn đã có tài khoản?
                </Typography>
                  <Box
                    onClick={() => dispatch(showSignInModal())}
                  >
                  <Typography
                    color="primary"
                    style={{
                      color: 'rgb(27, 168, 255)',
                      cursor: 'pointer',
                    }}
                  >
                    Đăng nhập
                  </Typography>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Card>
  );
}
export default SignUp;
