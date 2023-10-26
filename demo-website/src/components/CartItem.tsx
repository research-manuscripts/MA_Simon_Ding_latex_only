import React from "react";
import { CartContext, CartItem } from "../CartProvider";
import { currencyFormat } from "../I18n";

export function CartItemComponent({ item }: { item: CartItem }) {
    const cart = React.useContext(CartContext);

    return <div key={item.product.sys.id} className="cart-item">
        <img src={item.product.fields.image.fields.file.url} alt={item.product.fields.title} />
        <div>
            <h4>{item.product.fields.title}</h4>
            <h5>{currencyFormat().format(item.product.fields.price)}</h5>
            <span className="remove-item" onClick={() => cart.loading || cart.removeAllFromCart(item.product)}>remove</span>
        </div>
        <div>
            <i className="fas fa-chevron-up" onClick={() =>  cart.loading || cart.addToCart(item.product)}></i>
            <p className="item-amount">{item.quantity}</p>
            <i className="fas fa-chevron-down" onClick={() =>  cart.loading || cart.removeFromCart(item.product)}></i>
        </div>
    </div>;
}