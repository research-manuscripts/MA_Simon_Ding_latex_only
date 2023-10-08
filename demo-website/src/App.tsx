import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Hero from './Hero';
import Products from './Products';
import { ProductProvider } from './ProductProvider';

function App() {
  return (
    <ProductProvider>
      <Navbar />
      <Hero />
      <Products />
    </ProductProvider>
  );
}

export default App;
