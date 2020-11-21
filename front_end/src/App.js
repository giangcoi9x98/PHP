import React, { useState, Component } from 'react';
import HomeDefault from './view/DefaultView';
import { Provider } from 'react-redux';
import store from '././store';

const App = () => {
  return (
      <Provider store={store}>
        <HomeDefault/>
      </Provider>
    );
}
export default App;
