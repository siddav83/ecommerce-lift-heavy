import { createContext, useState } from "react";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    return (
        <ProductContext.Provider
            value={(selectedProducts, setSelectedProducts)}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
