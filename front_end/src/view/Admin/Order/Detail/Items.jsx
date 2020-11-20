import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, TextField } from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import { withRouter } from 'react-router-dom';
import api from '../../../../api';
import noti from '../../../../component/Notificator';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    display: 'flex',
  },
});

function Items(props) {
  const { orders } = props;
  const [orderList, setorderList] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      await setorderList(orders);
    };
    fetchData();
    console.log(orders);
    console.log(orderList);
  }, [orders]);
  console.log('list', orderList);
  console.log('order', orders);
  const classes = useStyles();
  const handleDelete = async (id) => {
    try {
        const res = await api.order.deleteOrder(id);
      
      if (res.status) {
        noti.success('Xoá thành công!')

           window.location='/order'
        }
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdate = async () => {
    const orderId = orderList.orderId;
    const status = orderList.status;
    try {
      const res = await api.order.updateOrder({
        orderId,
        status,
      });
      console.log(res);
      if (res.status) {
        noti.success('Cập nhật thành công!')
       // window.location = '/order';
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    setorderList({
      ...orderList,
      [e.target.name]: e.target.value,
    });
    console.log(orderList.status);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mã đơn hàng</TableCell>
            <TableCell align="right">Ngày mua</TableCell>
            <TableCell align="right">Người mua</TableCell>
            <TableCell align="center">Sản phẩm</TableCell>
            <TableCell align="right">Tổng tiền</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={orderList.username}>
            <TableCell component="th" scope="row">
              {orderList.orderId}
            </TableCell>
            <TableCell align="right">
              {moment(orderList.created_at).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell align="right">{orderList.username}</TableCell>
            <TableCell align="left">{orderList.display}</TableCell>
            <TableCell align="right">
              {new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'VND',
              }).format(orderList.price)}
            </TableCell>
            <TableCell align="right">
              <TextField
                name="status"
                onChange={handleChange}
                value={orderList.status}
              ></TextField>
            </TableCell>
            <TableCell align="center">
              <div className={classes.button}>
                <Button onClick={()=>handleDelete(orderList.orderId)}>
                  <DeleteIcon></DeleteIcon>
                </Button>
                <Button onClick={handleUpdate}>
                  <UpdateIcon></UpdateIcon>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withRouter(Items);
