import API from './api';

export const getAllcategoryId = async ({ params}) => {
  try {
    const res = await API.get('/category',{params});
    return {
      status: true,
      data: res.data,
    };
  } catch (err) {
    return {
      status: false,
      masage: 'Khong lay duoc du lieu',
    };
  }
};
