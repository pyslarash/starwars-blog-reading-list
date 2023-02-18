import React, { useState } from 'react';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Item from './views/item';

import store from './store/store'
import { Provider } from 'react-redux'

import Navbar from './component/navbar';
import { Footer } from './component/footer';

export const AddToFavorites = React.createContext();

const Layout = () => {
  const basename = process.env.BASENAME || '';

  return (
    <Provider store={store}> {/* Setting up the global state from Redux Toolkit */}
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:apiType/:number" element={<Item />} /> {/* A Route for a single item */}
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default Layout;
