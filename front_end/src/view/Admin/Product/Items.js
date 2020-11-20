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
import api from '../../../api'
import noti from '../../../component/Notificator';

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

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
    const handleDelete = async (id) => {
      try {
        const res= await api.product.deleteProduct(id)
        if (res.data) {
          noti.success('Xoá thành công !')
          window.location='/product'

        } else {
          noti.error('Xoá thất bại!')
        }
      } catch (e) {
        noti.error('xoá thất bại !')
      }
      
    }
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          {/* <Button>
            <SettingsIcon></SettingsIcon>
          </Button> */}
          <Button onClick={()=>handleDelete(product.productId)}>
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

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
