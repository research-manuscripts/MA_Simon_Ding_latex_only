import React from "react";
import "../App.css";
import "./Products.css";
import { ProductContext } from "../ProductProvider";
import { CartContext } from "../CartProvider";

function Products() {
    const catalog = React.useContext(ProductContext);
    const cart = React.useContext(CartContext);

    return (
        <section className="Products">
            <div className="Products-section-title">
                <h2>Our Products</h2>
            </div>
            <div className="Products-center">
                {
                    catalog.loading ? <h1>Loading...</h1> : catalog.products.map(product => {
                        return (
                            <article className="Products-product" key={product.sys.id}>
                                <div className="Products-img-container">
                                    <img src={product.fields.image.fields.file.url} alt={product.fields.title} className="product-img" />
                                    {!cart.loading && <button className="bag-btn" data-id={product.sys.id} onClick={() => {
                                        if (!cart.isItemInCart(product)) {
                                            cart.addToCart(product);
                                        }
                                        cart.show();
                                    }}>
                                        <i className="fas fa-shopping-cart"></i>
                                        {cart.isItemInCart(product) ? "in cart" : "add to cart"}
                                    </button>}
                                </div>
                                <h3>{product.fields.title}</h3>
                                <h4>${product.fields.price}</h4>
                            </article>
                        );
                    })
                }
            </div>
        </section>
    );
}

export default Products;