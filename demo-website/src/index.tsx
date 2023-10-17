import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Hero from './components/Hero';
import Products from './components/Products';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function ProductWrapper() {
  const category = useParams().category as string;
  return <Products category={category} />;
}

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path="" element={<><Hero /><Products category='s10' /></>} />
          <Route path="c/:category" element={<ProductWrapper />} />
          <Route path="checkout" element={<>Checkout Page</>} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
