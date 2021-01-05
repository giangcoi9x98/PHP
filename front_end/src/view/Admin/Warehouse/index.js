import React, { Component, useEffect, useState } from 'react';
import api from '../../../api';
import Items from './item'
export default function Order(props) {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = await api.warehouse.getAll();

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
