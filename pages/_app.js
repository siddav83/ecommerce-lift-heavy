import "@/styles/globals.css";
import ProductContextProvider from "@/components/ProductContext";

export default function App({ Component, pageProps }) {
    return (
        <ProductContextProvider>
            <Component {...pageProps} />
        </ProductContextProvider>
    );
}
