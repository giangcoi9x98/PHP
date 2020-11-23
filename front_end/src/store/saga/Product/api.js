import API from '../../api';

function* getAllProduct(params){
  try {
    const res = yield API.get('/product', params);
    return {
      status: true,
      data: res.data,
    };
  } catch (err) {
    return {
      status: false,
      mesage: ' Khong lay duoc du lieu',
    };
  }
}


function* getProductById(id){
  try {
    const res = yield API.get(`/product/${id}`);
    return {
      status: true,
      data: res,
    };
  } catch (err) {
    return {
      status: false,
      mesage: ' Khong lay duoc du lieu',
    };
  }
};
function* deleteProduct(id){
  try {
    const res = yield API.delete(`/product/${id}`);
    return {
      status:true
    }
  } catch (e) {
    return {
      status:false
    }
  }
}
function* createProduct({
                                      display,
                                      url_key,
                                      description,
                                      priceOut,
                                      priceIn,
                                      imageUrl,
                                      provider,
                                      instock,
                                      specifications,
                                    }){
  try {
    const res = yield API.post('/product', {
      display: display,
      url_key: url_key,
      description: description,
      priceOut: priceOut,
      priceIn: priceIn,
      imageUrl: imageUrl,
      provider: provider,
      instock: instock,
      specifications: specifications,
    });
    return {
      status: true,
      data: res,
    };
  } catch (e) {
    console.log(e.response.status)
    return {
      data: e,
      status: false,
    };
  }
};
function* updateProduct(id, {
  display, priceIn, priceOut, instock,
  description,imageUrl,provider,url_key
}){
  try {
    const res = yield API.put(`/product/${id}`, {
      display: display,
      url_key: url_key,
      description: description,
      priceOut: priceOut,
      priceIn: priceIn,
      imageUrl: imageUrl,
      provider: provider,
      instock: instock,
    });
    return {
      status: true,
      data:res.data
    }
  } catch (e) {
    return {
      status:false
    }
  }
}

export {getAllProduct, getProductById, updateProduct, deleteProduct, createProduct};
