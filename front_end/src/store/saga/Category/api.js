import API from '../../api';

function* getAllcategoryId(data){
  try {
    const res = API.get('/category');
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

export default getAllcategoryId;
