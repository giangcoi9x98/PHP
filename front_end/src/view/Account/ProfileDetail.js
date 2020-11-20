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
import noti from '../../component/Notificator'

const useStyles = makeStyles(() => ({
  root: {},
}));

function ProfileDetails(props) {
  const { user, isUpdate } = props;
  const classes = useStyles();
  const [values, setValues] = useState({});
  const [update, setupdate] = useState(false);
  useEffect(() => {
    setValues(user);
  }, [user,update]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleUpdate = async () => {
    const firstname = values.firstname;
    const lastname = values.lastname;
    const email = values.email;
    const phone = values.phone;
    const address = values.address;
    const password = values.password;

    try {
      const res = await api.account.updateAccount({
        firstname,
        lastname,
        email,
        phone,
        address,
        password,
      });
      console.log(res);
      if (res.status) {
        setupdate(true);
        noti.success('Cập nhật thành công!')

      }
    } catch (e) {
      noti.error('Cập nhật không thành công!')
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
                helperText="First Name"
                name="firstname"
                onChange={handleChange}
                value={values.firstname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Last Name"
                name="lastname"
                onChange={handleChange}
                value={values.lastname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="email"
                helperText="Email"
                onChange={handleChange}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Phone Number"
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
                name="address"
                helperText="Address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="password"
                fullWidth
                helperText="New Password"
                name="password"
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
                      
            onClick={async() => {
              await handleUpdate();
              await isUpdate(true);
            }}
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
