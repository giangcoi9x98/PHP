import API from './api';

export const search = async (key,page) => {
  try {
    const res = await API.get(
        `search/${key}?page=${page}`
    );
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
