import API from './api';

export const createOrder = async ({
  orders,
  note,
  address,
  price,
  totalBill,
}) => {
  try {
    const res = await API.post('/order', {
      orders: orders,
      note: note,
      address: address,
      price: price,
      totalBill: totalBill,
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
