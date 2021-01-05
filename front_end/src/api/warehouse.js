import API from './api';

export const getAll = async () => {
    try {
      const res = await API.get('warehouse');
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