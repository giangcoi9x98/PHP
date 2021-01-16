import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import api from '../../../api';
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

 function Items(props) {
  const classes = useStyles();
  const [product, setProduct] = useState({
    display: '',
    url_key: '',
    description: '',
    priceOut: 0,
    priceIn: 0,
    imageUrl: '',
    provider: '',
    instock: 0,
    specifications: '',
  });
   console.log(props.id);
  const handleUpdate= async (id) => {
    try {
      const display = product.display;
      const url_key = product.url_key;
      const description = product.description;
      const priceOut = parseInt(product.priceOut);
      const priceIn = parseInt(product.priceIn);
      const imageUrl = product.imageUrl;
      const provider = product.provider;
      const instock = parseInt(product.instock);
      const specifications = product.specifications;
      const res = await api.product.updateProduct(id,{
        display,
        url_key,
        description,
        priceOut,
        priceIn,
        imageUrl,
        provider,
        instock,
        specifications,
      });
      console.log(res);
      if (res.data) {
        noti.success('Tạo mới thành công!');
      } else {
        noti.error('Tạo mới thất bại!');
      }
    } catch (e) {
      noti.error('Tạo mới thất bại!');
      console.log(e.response);
    }
  };
  const hanldeChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
 useEffect(() => {
    
 }, [product.imageUrl])
  return (
    <div className={classes.root}>
      <div>
        <TextField
          name="display"
          onChange={hanldeChange}
          id="standard-full-width"
          label="Display"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
        />
        <TextField
          onChange={hanldeChange}
          type="number"
          name="priceIn"
          margin="normal"
          label="PriceIn"
          id="margin-none"
          className={classes.textField}
        />
        <TextField
          onChange={hanldeChange}
          type="number"
          label="PriceOut"
          name="priceOut"
          id="margin-dense"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          onChange={hanldeChange}
          type="number"
          label="Instock"
          id="margin-normal"
          name="instock"
          className={classes.textField}
          margin="normal"
        />
      </div>
      <div>
        <TextField
          onChange={hanldeChange}
          id="filled-full-width"
          label="Description"
          name="description"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="filled"
        />
        <TextField
          onChange={hanldeChange}
          margin="normal"
          label="ImageUrl"
          name="imageUrl"
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
        <TextField
          onChange={hanldeChange}
          label="Provider"
          name="provider"
          id="filled-margin-dense"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <TextField
          onChange={hanldeChange}
          label="Url_Key"
          name="url_key"
          id="filled-margin-normal"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <div>
          <img
            src={product.imageUrl}
         
          ></img>
        </div>
        <div>
          <TextField
            onChange={hanldeChange}
            name="specifications"
            id="outlined-full-width"
            label="Specifications"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            riant="outlined"
          />
        </div>
      </div>

      <div className={classes.button}>
        <Button onClick={()=>handleUpdate(props.id)} className={classes.textColor}>
          Tạo sản phẩm
        </Button>
      </div>
    </div>
  );
}
export default withRouter(Items)