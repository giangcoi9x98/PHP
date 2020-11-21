import React, { Component, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import UpdateItem from './updateItem';
import { connect } from 'react-redux';
import api from '../../../api'
function UpdateProduct(props) {
    const [id, setid] = useState(props.product.id);
    const [data, setData] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            await setid(props.product.id)
            const res = await api.product.getProductById(id)
            if (res.status) {
                await setData(res.data.data)
            }
        }
        fetchData()
       
    }, [props.product.id])
   

  return (
    <div
          style={{
          padding:'3%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
    
   <UpdateItem product={data}></UpdateItem>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        product:state.product
    }
}
export default withRouter(connect(mapStateToProps)(UpdateProduct));
