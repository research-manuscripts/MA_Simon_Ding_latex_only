import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { ProductProvider } from './ProductProvider';
import Cart from './components/Cart';
import { CartProvider } from './CartProvider';
import {  Outlet } from 'react-router-dom';

// adapted from https://alexkorep.com/react/react-many-context-providers-tree/
type TreeComp = React.FC<React.PropsWithChildren<{}>>;
const BuildProviderTree: (providers: TreeComp[]) => TreeComp = providers => {
  if (providers.length === 1) {
    return providers[0];
  }
  const A = providers.shift()!;
  const B = providers.shift()!;
  return BuildProviderTree([
    ({ children }: React.PropsWithChildren<{}>) => (
      <A>
        <B>
          {children}
        </B>
      </A>
    ),
    ...providers,
  ]) as React.FC<React.PropsWithChildren<{}>>;
};

const Providers = BuildProviderTree([
  ProductProvider,
  CartProvider,
])

function App() {
  return (
    <Providers>
      <Navbar />
      <Outlet />
      <Cart />
    </Providers>
  );
}

export default App;
