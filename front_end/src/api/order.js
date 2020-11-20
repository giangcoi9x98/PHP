import { reach } from 'yup';
import API from './api';

export const createOrder = async ({
  orders,
  note,
  address,
  price,
  type,
  display,
}) => {
  try {
    const res = await API.post('/order', {
      orders: orders,
      note: note,
      address: address,
      price: price,
      type: type,
      display,
    });
    return {
      status: true,
      data: res,
    };
  } catch (err) {
    return {
      status: false,
    };
  }
};
export const getAllOrderByUsername = async (username) => {
  try {
    const res = await API.get(`order/${username}`);
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
export const getAll = async () => {
  try {
    const res = await API.get(`order`);
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
export const getById = async (id) => {
  try {
    const res = await API.get(`orders/${id}`);
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
export const updateOrder = async ({ orderId, status }) => {
  try {
    const res = await API.put(`order`, {
      orderId: orderId,
      status: status,
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
export const deleteOrder = async (id) => {
  try {
    const res = await API.delete(`order/${id}`);
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
