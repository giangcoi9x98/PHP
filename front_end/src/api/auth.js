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
