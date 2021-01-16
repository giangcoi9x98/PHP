import axios from 'axios';
import Cookie from 'js-cookie';
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

API.interceptors.request.use(
  (req) => {
    req.headers.authorization = `Bearer ${Cookie.get('token')}`;
    return req;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  },
);
API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  },
);
export default API;
