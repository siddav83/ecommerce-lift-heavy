import React from "react";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div>
            <div className="p-5 flex justify-center flex-col">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
