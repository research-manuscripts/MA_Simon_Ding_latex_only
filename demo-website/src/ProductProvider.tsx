import React from "react";

export interface Product {
    sys: { "id": string },
    fields: {
        title: string,
        price: number,
        image: { fields: { file: { url: string } } }
    }
}

export interface ProductCatalog {
    loading: boolean;
    products: Product[];
}

export const ProductContext = React.createContext<ProductCatalog>({ loading: true, products: [] });

export const ProductProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [context, setContext] = React.useState({ loading: true, products: [] });

    const fetchProducts = async () => {
        try {
            const response = await fetch("products.json");
            const data = await response.json();
            const products = data.items;
            setContext({ loading: false, products });
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={context}>
            {children}
        </ProductContext.Provider>
    );
}