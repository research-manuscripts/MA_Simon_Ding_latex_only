import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { ProductProvider } from './ProductProvider';
import Cart from './components/Cart';
import { CartProvider } from './CartProvider';
import {  Outlet } from 'react-router-dom';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Navbar />
        <Outlet />
        <Cart />
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
