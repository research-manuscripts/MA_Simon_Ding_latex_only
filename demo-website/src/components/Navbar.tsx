import React, { useContext, useMemo } from 'react';
import './Navbar.css';
import './Cart.css'
import { CartContext } from '../CartProvider';

function Navbar() {
  const cart = useContext(CartContext);
  const cartTotal = useMemo(() => {
    if (cart.loading) {
      return 0;
    } else {
      return Object.values(cart.cart).reduce((total, item) => total + item.quantity, 0);
    }
  }, [cart]);

  return (
    <nav className="Navbar">
        <div className="Navbar-center">
           <span className="Navbar-icon">
               <i className="fas fa-bars"></i>
           </span> 
           
            <div className="Navbar-cart-btn" onClick={() => !cart.loading && cart.show()}>
               <span className="Navbar-icon">
                   <i className="fas fa-cart-plus"></i>
               </span> 
          <div className="cart-items">{ cartTotal }</div>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
