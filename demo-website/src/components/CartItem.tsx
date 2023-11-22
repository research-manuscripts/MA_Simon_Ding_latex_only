import React, { useId } from "react";
import { CartContext, CartItem } from "../CartProvider";
import { currencyFormat } from "../I18n";

export function CartItemComponent({ item }: { item: CartItem }) {
    const cart = React.useContext(CartContext);
    const removeId = useId();
    const plusId = useId();
    const minusId = useId();

    return <div key={item.product.sys.id} className="cart-item">
        <img src={item.product.fields.image.fields.file.url} alt={item.product.fields.title} />
        <div>
            <h4>{item.product.fields.title}</h4>
            <h5>{currencyFormat().format(item.product.fields.price)}</h5>
            <span id={removeId} className="remove-item on-click" onClick={() => cart.loading || cart.removeAllFromCart(item.product)}>remove</span>
        </div>
        <div>
            <i id={plusId} className="fas fa-chevron-up on-click" onClick={() =>  cart.loading || cart.addToCart(item.product)}></i>
            <p className="item-amount">{item.quantity}</p>
            <i id={minusId} className="fas fa-chevron-down on-click" onClick={() =>  cart.loading || cart.removeFromCart(item.product)}></i>
        </div>
    </div>;
}