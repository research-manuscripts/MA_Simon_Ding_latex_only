import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import { ProductProvider } from './ProductProvider';
import Cart from './components/Cart';
import { CartProvider } from './CartProvider';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Navbar />
        <Hero />
        <Products />
        <Cart />
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
