import { createContext, useState } from "react";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    return (
        <ProductContext.Provider
            value={{ selectedProducts, setSelectedProducts }}
        >
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
