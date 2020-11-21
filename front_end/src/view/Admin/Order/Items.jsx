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
import { connect } from 'react-redux';
import { addId } from '../../../store/actions/countAction';

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
  const [orderList, setorderList] = useState([]);
  const [status, setStatus] = useState(orders.status);
  useEffect(() => {
    setorderList(orders);
    console.log(orders);
    console.log(orderList);
  }, [orders]);

  const classes = useStyles();
  console.log(orders);
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
          {orderList.map((orderList) => (
            <TableRow key={orderList.username}>
              <TableCell component="th" scope="row">
                {orderList.orderId}
              </TableCell>
              <TableCell align="right">
                {moment(orderList.created_at).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell align="right">{orderList.username}</TableCell>
              <TableCell style={{width:'40%'}} align="center">{orderList.display}</TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'VND',
                }).format(orderList.price)}
              </TableCell>
              <TableCell align="right">
                <TextField
                  onChange={(e) => {
                    console.log(e.target);
                  }}
                  value={orderList.status}
                ></TextField>
              </TableCell>
              <TableCell align="center">
                <div className={classes.button}>
                  <Button
                    onClick={() =>
                      props.history.push(`/order/update/${orderList.orderId}`)
                    }
                  >
                    <UpdateIcon></UpdateIcon>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addId: (id) => dispatch(addId(id)),
  };
};

export default withRouter(connect(null,mapDispatchToProps)(Items));
