import React, { useEffect, useId } from "react";
import "./Cart.css";
import "./BannerButton.css";
import { CartContext } from "../CartProvider";
import { CartItemComponent } from "./CartItem";
import { Link } from "react-router-dom";
import { currencyFormat } from "../I18n";

/*
<div class="cart-overlay">
    <div class="cart">
        <span class="close-cart">
            <i class="fas fa-window-close"></i>
        </span> 
        <h2>Your cart</h2>
        <div class="cart-content">
            <!-- cart item -->
            <!--<div class="cart-item">
                
            </div>
            <!-- end of cart item --> 
        </div>
        <div class="cart-footer">
            <h3>your total: $ <span class="cart-total">0</span></h3>
            <button class="clear-cart banner-btn">clear cart</button>
        </div>
    </div>
</div>
*/

function Cart() {
    const cart = React.useContext(CartContext);

    const visible = !cart.loading && cart.showCart;

    const buttonId = useId();
    const clearLinkId = useId();

    useEffect(() => {
        console.log(cart, visible);
    }, [cart, visible]);

    return <>{ !cart.loading && <div className={ 'cart-overlay' + (visible ? ' transparentBcg' : '') } onClick={() => cart.hide()}>
        <div className={ 'cart' + (visible ? ' showCart' : '')} onClick={e => e.stopPropagation() /* prevents cart from closing */}>
            <span className="close-cart" onClick={() => cart.hide()}>
                <i className="fas fa-window-close"></i>
            </span>
            <h2>Your cart</h2>
            <div className="cart-content">
                {Object.values(cart.cart).map(item => <CartItemComponent item={item} />)}
            </div>
            <div className="cart-footer">
                <h3>your total: <span className="cart-total">{ currencyFormat().format(cart.total) }</span></h3>
                <button id={buttonId} className="clear-cart banner-btn" onClick={() => {
                    cart.clearCart();
                    cart.hide();
                }}>clear cart</button>
                <Link id={clearLinkId} to="/checkout" style={{textDecoration: 'none'}}><div className="banner-btn clear-cart" onClick={() => cart.hide()}>Checkout</div></Link>
            </div>
        </div>
    </div>}
    </>;
}

export default Cart;