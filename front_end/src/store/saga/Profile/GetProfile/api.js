import API from '../../../api';

function* getProfile(){
  try {
    const res = yield API.get('/me');
    return {
      data: res.data,
      status: true,
    };
  } catch (e) {
    return {
      status: false,
    };
  }
};

export default getProfile;
