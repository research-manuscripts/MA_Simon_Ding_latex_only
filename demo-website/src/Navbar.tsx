import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="Navbar">
        <div className="Navbar-center">
           <span className="Navbar-icon">
               <i className="fas fa-bars"></i>
           </span> 
           
            <div className="Navbar-cart-btn">
               <span className="Navbar-icon">
                   <i className="fas fa-cart-plus"></i>
               </span> 
               <div className="cart-items">0</div>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
