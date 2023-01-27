import Head from "next/head";

import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Product from "@/components/Product";
import { connectDatabase } from "@/lib/mongoose";
import { findAllProducts } from "./api/products";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

export default function Home({ products }) {
    const [searchTerm, setSearchTerm] = useState("");

    const categoriesProduct = products && [
        ...new Set(products.map((info) => info.category)),
    ];

    if (searchTerm) {
        products = products.filter((search) =>
            search.name.toLowerCase().includes(searchTerm)
        );
    }

    return (
        <Layout>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="bg-gray-100 w-full px-3 py-3 rounded-xl"
            />
            <div>
                {categoriesProduct &&
                    categoriesProduct.map((cat) => {
                        return (
                            <div key={cat}>
                                {products.find((p) => p.category === cat) && (
                                    <div>
                                        <h2 className="font-bold text-2xl py-5 capitalize">
                                            {cat}
                                        </h2>
                                        <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide justify-center">
                                            {products
                                                .filter(
                                                    (p) => p.category === cat
                                                )
                                                .map((product) => (
                                                    <div
                                                        key={product._id}
                                                        className="px-5 snap-start"
                                                    >
                                                        <Product
                                                            products={product}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
        </Layout>
    );
}

export const getServerSideProps = async () => {
    await connectDatabase();
    const products = await findAllProducts();
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
};
