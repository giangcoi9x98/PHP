import Cookie from 'js-cookie';

const getOrder = () => {
  const orderStr = localStorage.getItem('order') || '[]';
  return JSON.parse(orderStr) || [];
};

const saveOrder = (originalArray) => {
  const newArray = getDataToCart(originalArray);
  localStorage.setItem('order', JSON.stringify(newArray), { expires: 30 });
};
const getDataToCart = (orders) => {
  try {
    let data = orders,
      hash = Object.create(null),
      result = [];

    data.forEach(function (obj) {
      if (!hash[obj.id]) {
        hash[obj.id] = { id: obj.id, count: 0 };
        result.push(hash[obj.id]);
      }
      hash[obj.id].count += obj.count;
    });
    return result;
  } catch {
    return 0;
  }
};
const updateCountOrder = (orders) => {
  try {
    let data = orders,
      result = [],
      hash = Object.create(null);

    data.forEach(function (obj) {
      if (!hash[obj.id]) {
        hash[obj.id] = { id: obj.id, count: 0 };
        result.push(hash[obj.id]);
      }
      hash[obj.id].count = obj.count;
    });
    return result;
  } catch {
    return 0;
  }
};
const deleteOrder = (orders, id) => {
  try {
    let data = orders,
      key=id,
      result = [],
      hash = Object.create(null);

    data.forEach(function (obj) {
      if (!hash[obj.id]) {
        hash[obj.id] = { id: obj.id, count: obj.count };
        if (hash[obj.id].id !== key) {
          result.push(hash[obj.id])
          console.log(key);
        }
        }
    });
    return result;
  } catch {
    return 0;
  }
};
const updateOrder = (originalArray) => {
  const newArray = updateCountOrder(originalArray);
  localStorage.setItem('order', JSON.stringify(newArray), { expires: 30 });
};
const getTotalCount = () => {
  try {
    const listOrders = getOrder();
    const total = listOrders
      .map((product) => {
        return product.count;
      })
      .reduce((a, b) => a + b);
    return total;
  } catch {
    return 0;
  }
};

export default {
  getOrder,
  saveOrder,
  getTotalCount,
  getDataToCart,
  updateCountOrder,
  updateOrder,
  deleteOrder,
};
