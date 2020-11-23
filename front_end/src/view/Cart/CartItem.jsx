import {
  Card,
  Typography,
  Grid,
  CardMedia,
  Divider,
  TextField,
  Button,
  ButtonGroup,
  Box,
} from '@material-ui/core';
import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { updateOrder, deleteOrder } from '../../store/actions/countAction';
import { withRouter } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import {
  decrement,
  increment,
  subCount,
} from '../../store/actions/countAction';
import noti from '../../component/Notificator';
const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  itemOder: {
    display: 'flex',
    width: '100%',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '40%',
  },
  order: {
    display: 'flex',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPrice: {
    marginLeft: '6%',
    fontWeight: 500,
    fontSize: 16,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textPriceIn: {
    marginRight: '5%',
    textAlign: 'right',
    textDecoration: 'line-through',
    fontSize: 12,
    color: 'rgb(162, 162, 162)',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  count: {
    border: ' 1px solid rgba(0, 0, 0, 0.23)',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  delete: {
    color: 'rgb(27, 168, 255)',
    cursor: 'pointer',
  },
}));

function CartItem(props) {
  const { totalBill } = props;
  const [orderProduct, setOrderProduct] = useState({
    id: props.orders.productId,
    count: props.orders.orderCount,
  });

  const classes = useStyle();
  const priceIn = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'VND',
  }).format(props.orders.priceIn);
  const priceOut = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'VND',
  }).format(props.orders.priceOut);
  const percentSale =
    '-' +
    Math.ceil(
      (parseFloat(props.orders.priceSale) / parseFloat(props.orders.priceIn)) *
        100,
    ) +
    '%';

  const handleChangeCount = (e) => {
    if (e.target.value === '') {
      setOrderProduct({
        ...orderProduct,
        count: 1,
      });
    } else {
      setOrderProduct({
        ...orderProduct,
        count: parseInt(e.target.value),
      });
    }
  };
  const deleteOrder = async () => {
    await props.subCount(orderProduct.count)
    await props.deleteOrder(orderProduct.id);
    noti.success('Xoá thành công')
    window.location = '/order/cart';
  };
  const updateOrder = async () => {
    await props.updateOrder(orderProduct);
  };
  useEffect(() => {
    (async () => {
      await updateOrder();
    })();
  }, [orderProduct.count]);

  return (
    <Grid className={classes.root} container>
      <Card className={classes.itemOder}>
        <div className={classes.image}>
          <img className={classes.image} src={props.orders.imageUrl} />
        </div>
        <div className={classes.detail}>
          <Typography>{props.orders.display}</Typography>
          <Box onClick={deleteOrder}>
            <Typography className={classes.delete}>Xoá sản phẩm</Typography>
          </Box>
        </div>
        <div className={classes.order}>
          <div className={classes.price}>
            <div>
              <Typography className={classes.textPrice}>{priceOut}</Typography>
            </div>
            <div className={classes.order}>
              <Typography color="primary" className={classes.textPriceIn}>{priceIn}</Typography>
              <Typography className={classes.textPrice}>
                {percentSale}
              </Typography>
            </div>
            <div>
              <ButtonGroup className={classes.buttonGroup}>
                <Button
                  onClick={() => {
                    if (orderProduct.count > 1) {
                      setOrderProduct({
                        ...orderProduct,
                        count: orderProduct.count - 1,
                      });
                      props.decrement();
                      totalBill(-props.orders.priceOut);
                    }
                  }}
                >
                  -
                </Button>

                <Typography className={classes.count}>
                  {orderProduct.count}
                </Typography>
                <Button
                  onClick={() => {
                    setOrderProduct({
                      ...orderProduct,
                      count: orderProduct.count + 1,
                    });
                    props.increment();
                    totalBill(props.orders.priceOut);
                  }}
                >
                  +
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </Card>
    </Grid>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateOrder: (product) => dispatch(updateOrder(product)),
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    deleteOrder: (id) => dispatch(deleteOrder(id)),
    subCount: (count) => dispatch(subCount(count)),
  };
};
export default withRouter(connect(null, mapDispatchToProps)(CartItem));
