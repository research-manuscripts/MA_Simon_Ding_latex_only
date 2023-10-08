import React from "react";
import { Product } from "./ProductProvider";

export interface LoadedCartContext {
    loading: false;
    showCart: boolean;
    cart: Record<string, CartItem>;
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    removeAllFromCart: (product: Product) => void;
    isItemInCart: (product: Product) => boolean;
    clearCart: () => void;
    show(): void;
    hide(): void;
}

export type ShoppingCart = LoadedCartContext | { loading: true };

export interface CartItem {
    product: Product;
    quantity: number;
}

export const CartContext = React.createContext<ShoppingCart>({ loading: true});

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [cart, setCart] = React.useState<Record<string, CartItem>>({});
    const [showCart, setShowCart] = React.useState(false);

    const addToCart = (product: Product) => {
        const newCart = { ...cart };
        if (newCart[product.sys.id]) {
            newCart[product.sys.id].quantity++;
        } else {
            newCart[product.sys.id] = { product, quantity: 1 };
        }
        setCart(newCart);
    }

    const removeFromCart = (product: Product) => {
        const newCart = { ...cart };
        if (newCart[product.sys.id]) {
            newCart[product.sys.id].quantity--;
            if (newCart[product.sys.id].quantity === 0) {
                delete newCart[product.sys.id];
            }
        }
        setCart(newCart);
    }

    const isItemInCart = (product: Product) => {
        return !!cart[product.sys.id];
    }

    const removeAllFromCart = (product: Product) => {
        const newCart = { ...cart };
        delete newCart[product.sys.id];
        setCart(newCart);
    }

    const clearCart = () => {
        setCart({ });
    }

    const show = () => setShowCart(true);

    const hide = () => setShowCart(false);

    return (
        <CartContext.Provider value={{ cart, showCart, addToCart, removeFromCart, isItemInCart, removeAllFromCart, clearCart, show, hide, loading: false }}>
            {children}
        </CartContext.Provider>
    );
}