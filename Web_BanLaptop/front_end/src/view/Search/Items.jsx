import React, { Component, useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
} from '@material-ui/core';
import {withRouter} from 'react-router-dom'
function Items(props) {
  const [products, setproducts] = useState(props.products);
  useEffect(() => {
    setproducts(props.products);
  }, [props.products]);
 

  return (
    <div style={{display:'flex',flexFlow:'wrap'}}>
          {products.map((product) => {
           const handleOrder = async () => {
            window.location=`/detail/${product.productId}`;
          };
        const priceIn = new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'VND',
        }).format(product.priceIn);
        const priceOut = new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'VND',
        }).format(product.priceOut);
        const percentSale =
          'Giảm -' +
          Math.ceil(
            (parseFloat(product.priceSale) / parseFloat(product.priceIn)) *
              100,
          );
        return (
          <Grid item xs={12} sm={6} md={3}>
            <Card
              onClick={handleOrder}
              style={{
                margin: 5,
                maxHeight: 470,
                minHeight: 470,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardMedia
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <img src={product.imageUrl}></img>{' '}
              </CardMedia>

              <CardContent>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  component="p"
                  align="center"
                  display="initial"
                >
                  {product.display}
                </Typography>
              </CardContent>
              <CardActions
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    justifyContent: 'space-around',
                    display: 'flex',
                    height: '10%',
                    width: '100%',
                  }}
                >
                  <Typography variant="h6" color="textPrimary">
                    {priceOut}
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      style={{
                        textDecoration: 'line-through',
                        color: '#9e9e9e',
                        marginLeft: 20,
                        marginTop: 8,
                      }}
                    >
                      {priceIn}
                    </Typography>
                    <Typography
                      style={{
                        marginLeft: 10,
                        marginTop: 8,
                        height: 8,
                        color: '#ff1744',
                      }}
                    >
                      {percentSale}%
                    </Typography>
                  </div>
                </div>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </div>
  );
}
export default withRouter(Items)