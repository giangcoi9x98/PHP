import React, { Component, useEffect, useState } from 'react';
import API from '../../../api';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import noti from '../../../component/Notificator';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  button: {
    margin: '1%',
    backgroundColor: '#3f51b5',
  },
  textColor: {
    color: '#fff',
  },
}));
function Item(props) {
  const classes = useStyles();
  const [laptop, setLaptop] = useState({
    productId: '',
    serieCode: '',
  });
  const handleCreate = async () => {
    const productId = laptop.productId;
    const serieCode = laptop.serieCode;
    const user = await API.account.getProfile();
    const check = await API.product.getProductById(productId);
    const res = await API.laptop.create({
      productId: productId,
      serieCode: serieCode,
      accountId:user.data.data.username
    });

    if (res.status) {
      noti.success('Thành công !');
      if (check.data.data==="") {
        props.history.push(`/product/create/${productId}`);
      }
    } else {
      noti.error('Thất bại');
      console.log(user.data.data.username);
    }
  };
  const hanldeChange = (e) => {
    setLaptop({
      ...laptop,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={classes.root}>
      <div>
        <TextField
          name="productId"
          onChange={hanldeChange}
          id="standard-full-width"
          label="productId"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
        />
        <TextField
          onChange={hanldeChange}
          name="serieCode"
          margin="normal"
          label="serieCode"
          id="margin-none"
          className={classes.textField}
        />
      </div>
      <div className={classes.button}>
        <Button onClick={handleCreate} className={classes.textColor}>
          Tạo mới
        </Button>
      </div>
    </div>
  );
}
export default withRouter(Item);
