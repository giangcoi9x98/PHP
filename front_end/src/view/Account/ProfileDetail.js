import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { VpnLock } from '@material-ui/icons';
import api from '../../api';

const useStyles = makeStyles(() => ({
  root: {},
}));

function ProfileDetails(props) {
  const { user } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: user.lastname,
    lastName: user.firstname,
    email: user.email,
    phone: user.phone,
    state: user.address,
    address: user.address,
    password: '',
  });
  useEffect(() => {
    setValues(user);
  }, [user]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleUpdate = async () => {
    const firstname = user.firstName;
    const lastname = user.lastName;
    const email = user.email;
    const phone = user.phone;
    const address = user.address;
    const password = user.password;
    try {
       const res= await api.account.updateAccount({
        firstname,
        lastname,
        email,
        phone,
        address,
        password,
       });
        console.log(res);
        if (res.status) {
           // window.location='/me'
        }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form autoComplete="off" noValidate className={clsx(classes.root)}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="New Password"
                name="state"
                onChange={handleChange}
                value={values.password}
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            onClick={handleUpdate}
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
