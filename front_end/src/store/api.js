import axios from 'axios';
import Cookie from 'js-cookie';
import constants from '../constants'
const API = axios.create({
  baseURL: constants.serverUrl,
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
  },
);
export default API;
