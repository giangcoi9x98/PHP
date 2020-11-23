import API from './api';

export const getAllProduct = async (params) => {
  try {
    const res = await API.get('/product', {
      params,
    });
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
};

export const getProductById = async (id) => {
  try {
    const res = await API.get(`/product/${id}`);
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
export const deleteProduct = async (id) => {
  try {
    const res = await API.delete(`/product/${id}`);
    return {
      status: true,
    };
  } catch (e) {
    return {
      status: false,
    };
  }
};
export const createProduct = async ({
  display,
  url_key,
  description,
  priceOut,
  priceIn,
  imageUrl,
  provider,
  instock,
  specifications,
}) => {
  try {
    const res = await API.post('/product', {
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
    console.log(e.response.status);
    return {
      data: e,
      status: false,
    };
  }
};
export const updateProduct = async (
  id,
  {
    display,
    priceIn,
    priceOut,
    instock,
    description,
    imageUrl,
    provider,
    url_key,
  },
) => {
  try {
    const res = await API.put(`/product/${id}`, {
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
      data: res.data,
    };
  } catch (e) {
    return {
      status: false,
    };
  }
};
