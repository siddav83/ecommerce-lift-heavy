import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const [selectedProducts, setSelectedProducts] = useLocalStorageState(
        "products",
        {
            defaultValue: [],
        }
    );
    return (
        <ProductContext.Provider
            value={{ selectedProducts, setSelectedProducts }}
        >
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
