import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton } from 'material-ui';
import api from '../../../api';
import noti from '../../../component/Notificator';
import { withRouter } from 'react-router-dom';
import Items from './createItem';
import { addId } from '../../../store/actions/countAction';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ProductCard = (props) => {
  const { className, product} = props;
  const classes = useStyles();
  const handleDelete = async (id) => {
    try {
      const res = await api.product.deleteProduct(id);
      if (res.status) {
        noti.success('Xoá thành công !');
        window.location = '/product';
      } else {
        noti.error('Xoá thất bại!');
      }
    } catch (e) {
      noti.error('xoá thất bại !');
    }
  };
  const handleUpdate = async () => {
    await props.addId(product.productId);
    await props.history.push(`/update/product?id=${product.productId}`)
  };
  return (
    <Card
      onClick={()=>props.history.push(`/detail/${product.productId}`)}
      className={clsx(classes.root, className)}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button>
            <SettingsIcon onClick={handleUpdate}></SettingsIcon>
          </Button>
          <Button onClick={() => handleDelete(product.productId)}>
            <DeleteIcon></DeleteIcon>
          </Button>
        </div>
        <Box display="flex" justifyContent="center" mb={6}>
          <Avatar
            style={{ width: '20%', height: '20%' }}
            alt="Product"
            src={product.imageUrl}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h7"
        >
          {product.display}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
    </Card>
  );
};


const mapStateToProps = (state) => {
  return {
    id: state.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addId: (id) => dispatch(addId(id)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductCard),
);
