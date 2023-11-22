import React, { useContext, useId, useMemo, useState } from 'react';
import './Navbar.css';
import './Cart.css'
import { CartContext } from '../CartProvider';
import { ProductContext } from '../ProductProvider';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const cart = useContext(CartContext);
  const cartTotal = useMemo(() => {
    if (cart.loading) {
      return 0;
    } else {
      return Object.values(cart.cart).reduce((total, item) => total + item.quantity, 0);
    }
  }, [cart]);
  const products = useContext(ProductContext);
  const categories = useMemo(() => {
    if (products.loading) {
      return [];
    } else {
      return products.categories;
    }
  }, [products]);

  const linkId = useId();
  const menuButtonId = useId();
  const cartButtonId = useId();

  return (
    <nav className={"Navbar" + (menuVisible ? ' visible' : '')}>
      <div className="Top-row">
        <div className="Navbar-center">
           <span id={menuButtonId} className="Navbar-icon on-click" onClick={() => setMenuVisible(!menuVisible)}>
               <i className="fas fa-bars"></i>
           </span> 
           
            <div id={cartButtonId} className="Navbar-cart-btn on-click" onClick={() => !cart.loading && cart.show()}>
               <span className="Navbar-icon">
                   <i className="fas fa-cart-plus"></i>
               </span> 
          <div className="cart-items">{ cartTotal }</div>
            </div>
        </div>
      </div>
      
      { <menu className={menuVisible ? 'visible' : ''}>
        <li><NavLink id={linkId + '-home'} to="/">Home</NavLink></li>
        { categories.map((x, i) => <li><NavLink id={linkId + '-' + x.sys.id} to={`c/${x.sys.id}`} key={i}>{x.fields.title}</NavLink></li>)}
      </menu> }
      
    </nav>
  );
}

export default Navbar;
