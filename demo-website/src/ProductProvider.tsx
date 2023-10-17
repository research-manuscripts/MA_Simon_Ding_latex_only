import React from "react";

export interface Product {
    sys: { id: string },
    fields: {
        title: string,
        price: number,
        categories: string[],
        image: { fields: { file: { url: string } } }
    }
}

export interface ProductCatalog {
    loading: boolean;
    products: Product[];
    categories: Category[];
}

export interface Category {
    sys: { id: string },
    fields: {
        title: string,
        description?: string,
        image: { fields: { file: { url: string } } }
    }
}

export const ProductContext = React.createContext<ProductCatalog>({ loading: true, products: [], categories: [] });

export const ProductProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [context, setContext] = React.useState({ loading: true, products: [], categories: [] });

    const fetchProducts = async () => {
        try {
            const response = await fetch("products.json");
            const data = await response.json();
            const products = data.items;
            const categories = data.categories;
            setContext({ loading: false, products, categories });
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