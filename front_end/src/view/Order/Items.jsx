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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

 function Items(props) {
  const { orders } = props;
  const [orderList, setorderList] = useState([]);

  useEffect(() => {
    setorderList(orders);
    console.log(orders);
    console.log(orderList);
  }, [orders]);
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mã đơn hàng</TableCell>
            <TableCell align="right">Ngày mua</TableCell>
            <TableCell align="right">Sản phẩm</TableCell>
            <TableCell align="right">Tổng tiền</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((orderList) => (
            <TableRow key={orderList.username}>
              <TableCell component="th" scope="row">
                {orderList.orderId}
              </TableCell>
              <TableCell align="right">
                {moment(orderList.created_at).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell align="left">{orderList.display}</TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'VND',
                }).format(orderList.price)}
              </TableCell>
              <TableCell align="right">{orderList.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Items;