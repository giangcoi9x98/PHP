import API from './api';

export const logIn = async ({ username, password }) => {
  try {
    const res = await API.post('/login', {
      username: username,
      password: password,
    });
    return {
      status: true,
      data: res.data,
    };
  } catch (err) {
    return {
      status: false,
      mesage: ' login falied',
    };
  }
};
export const logOut = async () => {
  try {
    const res = API.delete('/logout');
    return {
      status: true,
      data:(await res).data
    }
  } catch (e) {
    return {
      status:false
    }
  }
}