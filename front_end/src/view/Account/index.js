import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Profile from './Profile';
import ProfileDetails from './ProfileDetail';
import api from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import action from '../../store/actions';

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
  const [isUpdated, setisUpdated] = useState(false);
  const res = useSelector((state) => state?.profileReducer);
  const user = useSelector((state)=>state?.profileReducer?.data?.data);
  console.log('user',user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.on_GetProfileAction());
  }, []);
  if(user === undefined)  return null;
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
