import React, { useEffect } from "react";
import "./Cart.css";
import "./BannerButton.css";
import { CartContext } from "../CartProvider";

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

const usdFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function Cart() {
    const cart = React.useContext(CartContext);

    const visible = !cart.loading && cart.showCart;

    useEffect(() => {
        console.log(cart, visible);
    }, [cart, visible]);

    const total = React.useMemo(() => {
        if (cart.loading) {
            return 0;
        } else {
            return Object.values(cart.cart).reduce((total, item) => total + item.quantity * item.product.fields.price, 0);
        }
    }, [cart]);

    return <>{ !cart.loading && <div className={ 'cart-overlay' + (visible ? ' transparentBcg' : '') }>
        <div className={ 'cart' + (visible ? ' showCart' : '')}>
            <span className="close-cart" onClick={() => cart.hide()}>
                <i className="fas fa-window-close"></i>
            </span>
            <h2>Your cart</h2>
            <div className="cart-content">
                {Object.values(cart.cart).map(item => {
                    return <div key={item.product.sys.id} className="cart-item">
                        <img src={item.product.fields.image.fields.file.url} alt={item.product.fields.title} />
                        <div>
                            <h4>{item.product.fields.title}</h4>
                            <h5>{usdFormat.format(item.product.fields.price)}</h5>
                            <span className="remove-item" onClick={() => cart.removeAllFromCart(item.product)}>remove</span>
                        </div>
                        <div>
                            <i className="fas fa-chevron-up" onClick={() => cart.addToCart(item.product)}></i>
                            <p className="item-amount">{item.quantity}</p>
                            <i className="fas fa-chevron-down" onClick={() => cart.removeFromCart(item.product)}></i>
                        </div>
                    </div>;
                })}
            </div>
            <div className="cart-footer">
                <h3>your total: <span className="cart-total">{ usdFormat.format(total) }</span></h3>
                <button className="clear-cart banner-btn" onClick={() => {
                    cart.clearCart();
                    cart.hide();
                }}>clear cart</button>
            </div>
        </div>
    </div>}
    </>;
}

export default Cart;