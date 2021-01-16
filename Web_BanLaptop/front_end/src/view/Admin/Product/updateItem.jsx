import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import api from '../../../api';
import noti from '../../../component/Notificator';
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
    color: '#fff',
  },
  textColor: {
    color: '#fff',
  },
}));
function Item(props) {
  const { product } = props;
  const classes = useStyles();
  const [dataUpdate, setdataUpdate] = useState(product);
  const hanldeChange = (e) => {
    setdataUpdate({
      ...product,
      [e.target.name]: e.target.value,
    });
    console.log(dataUpdate);
  };
  const handleUpdate = async (id) => {
    try {
     ;
      const display = dataUpdate.display;
      const url_key = dataUpdate.url_key;
      const description = dataUpdate.description;
      const priceOut = parseInt(dataUpdate.priceOut);
      const priceIn = parseInt(dataUpdate.priceIn);
      const imageUrl = dataUpdate.imageUrl;
      const provider = dataUpdate.provider;
      const instock = parseInt(dataUpdate.instock);
      const res = await api.product.updateProduct(id, {
        display,
        url_key,
        description,
        priceOut,
        priceIn,
        imageUrl,
        provider,
        instock,
      });
       console.log(dataUpdate);
      if (res.status) {
        console.log(res);
        noti.success('Cập nhật thành công !')  
      } else {
          noti.error('Cập nhật thất bại')
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setdataUpdate(product);
  }, [product]);

  return (
    <div>
      <div>
        <TextField
          name="display"
          onChange={hanldeChange}
          id="standard-full-width"
          helperText="Display"
          value={dataUpdate.display}
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
        />
        <TextField
          onChange={hanldeChange}
          type="number"
          name="priceIn"
          value={dataUpdate.priceIn}
          margin="normal"
          helperText="PriceIn"
          id="margin-none"
          className={classes.textField}
        />
        <TextField
          onChange={hanldeChange}
          type="number"
          helperText="PriceOut"
          value={dataUpdate.priceOut}
          name="priceOut"
          id="margin-dense"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          onChange={hanldeChange}
          type="number"
          value={dataUpdate.instock}
          helperText="Instock"
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
          helperText="Description"
          name="description"
          value={dataUpdate.description}
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="filled"
        />
        <TextField
          onChange={hanldeChange}
          margin="normal"
          helperText="ImageUrl"
          name="imageUrl"
          value={dataUpdate.imageUrl}
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
        <TextField
          onChange={hanldeChange}
          helperText="Provider"
          name="provider"
          value={dataUpdate.provider}
          id="filled-margin-dense"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <TextField
          onChange={hanldeChange}
          helperText="Url_Key"
          name="url_key"
          value={dataUpdate.url_key}
          id="filled-margin-normal"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <div>
          <img src={dataUpdate.imageUrl}></img>
        </div>
        <div>
          <Button onClick={()=>handleUpdate(dataUpdate.productId)} className={classes.button}>
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Item);
