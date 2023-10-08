import React from "react";
import "./Products.css";
import { ProductContext } from "./ProductProvider";

function Products() {
    const catalog = React.useContext(ProductContext);

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
                                    <img src={product.fields.image.fields.file.url} alt={product.fields.title} className="Products-photo" />
                                    <button className="bag-btn" data-id={product.sys.id}>
                                        <i className="fas fa-shopping-cart"></i>
                                        add to cart
                                    </button>
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