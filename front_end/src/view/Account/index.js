import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Profile from './Profile';
import ProfileDetails from './ProfileDetail';
import api from '../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  container: {
    marginTop: '4%',
  },
}));

const Account = () => {
  const classes = useStyles();
  const [user, setusers] = useState({});
  const [isUpdated, setisUpdated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.account.getProfile();
        if (res.status) {
          await setusers(res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const isUpdate = async () => {
      if (isUpdated) {
         //window.location = '/me';
      }
    };
    isUpdate()
    fetchData();
  }, [isUpdated]);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Profile user={user}></Profile>
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <ProfileDetails
            user={user}
            isUpdate={(isUpdate) => setisUpdated(isUpdate)}
          ></ProfileDetails>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
