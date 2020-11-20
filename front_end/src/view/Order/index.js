import React, { Component, useEffect, useState } from 'react';
import Items from './Items';
import api from '../../api';
export default function Order(props) {
  const [username, setusername] = useState('');
  const [orders, setorders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.account.getProfile();
        const order = await api.order.getAllOrderByUsername(username);
        if (res.status) {
          await setusername(res.data.data.username);
        }
          if (order.status) {
              await setorders(order.data)
          }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [username]);
  return (
    <div>
      <Items orders={orders}></Items>
    </div>
  );
}
