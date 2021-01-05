import API from './api';

export const create = async ({ productId, serieCode ,accountId}) => {
  try {
    const res = await API.post('/laptop', {
      productId: productId,
      serieCode: serieCode,
      accountId:accountId
    });
    return {
      status: true,
      data: res,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response.data,
      masage: 'create fail',
    };
  }
};
