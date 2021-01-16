import API from './api';

export const signUp = async ({
  username,
  password,
  firstname,
  lastname,
  email,
}) => {
  try {
    const res = await API.post('/register', {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
    });
    return {
      status: true,
      data: res,
    };
  } catch (error) {
    return {
      status: false,
      data:error.response.data,
      masage: 'sign up failed',
    };
  }
};
export const getAll = async () => {
  try {
    const res = await API.get('/account');
    return {
      status: true,
      data: res,
    };
  } catch (e) {
    return {
      status: false,
    };
  }
};
export const deleteAcount = async (id) => {
  try {
    const res = await API.delete(`/account/${id}`, {});
    return {
      status: true,
      data: res,
    };
  } catch (e) {
    return {
      status: false,
    };
  }
};
export const updateAccount = async (
  id,
  { firstname, lastname, email, phone, address, password },
) => {
  try {
    const res = API.put(`/account/${id}`, {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      address: address,
      password: password,
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
export const getProfile = async () => {
  try {
    const res = await API.get('/me');
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
