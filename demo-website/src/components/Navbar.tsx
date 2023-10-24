import React, { useContext, useMemo, useState } from 'react';
import './Navbar.css';
import './Cart.css'
import { CartContext } from '../CartProvider';
import { ProductContext } from '../ProductProvider';
import { NavLink } from 'react-router-dom';
import { NavLinkProps } from 'react-router-dom';

const dynLink: React.FC<React.PropsWithChildren<{to: NavLinkProps['to']}>> = ({children, to}) => <NavLink to={to} children={children} className={({ isActive }) => isActive ? 'active' : ''} />

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

  return (
    <nav className={"Navbar" + (menuVisible ? ' visible' : '')}>
      <div className="Top-row">
        <div className="Navbar-center">
           <span className="Navbar-icon" onClick={() => setMenuVisible(!menuVisible)}>
               <i className="fas fa-bars"></i>
           </span> 
           
            <div className="Navbar-cart-btn" onClick={() => !cart.loading && cart.show()}>
               <span className="Navbar-icon">
                   <i className="fas fa-cart-plus"></i>
               </span> 
          <div className="cart-items">{ cartTotal }</div>
            </div>
        </div>
      </div>
      
      { <menu className={menuVisible ? 'visible' : ''}>
        <li><NavLink to="/">Home</NavLink></li>
        { categories.map(x => <li><NavLink to={`c/${x.sys.id}`}>{x.fields.title}</NavLink></li>)}
      </menu> }
      
    </nav>
  );
}

export default Navbar;
