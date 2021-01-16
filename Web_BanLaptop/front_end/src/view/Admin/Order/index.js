import React, { Component, useEffect, useState } from 'react';
import Items from './Items';
import api from '../../../api';
export default function Order(props) {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = await api.order.getAll();

        if (order.status) {
          await setorders(order.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
 
  return (
    <div>
      <Items
        orders={orders}     
      ></Items>
    </div>
  );
}
