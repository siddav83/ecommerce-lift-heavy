import React, { useContext, useEffect, useState } from "react";
import Layout from "/components/Layout.js";
import { ProductContext } from "@/components/ProductContext";

const Checkout = () => {
    const { selectedProducts, setSelectedProducts } =
        useContext(ProductContext);
    const [productsInfo, setProductsInfo] = useState([]);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // useEffect(() => {

    //     const fetchSelectedProducts = async () => {
    //         try {
    //             const uniqueId = [...new Set(selectedProducts)];

    //             const data = await fetch(
    //                 `/api/products?ids="${uniqueId.join(",")}`
    //             );
    //             const response = await data.json();
    //             setProductsInfo(response);
    //         } catch (error) {
    //             console.log(error, "this is the error");
    //         }
    //     };
    //     fetchSelectedProducts();
    // }, [selectedProducts]);

    useEffect(() => {
        const uniqIds = [...new Set(selectedProducts)];
        fetch("/api/products?ids=" + uniqIds.join(","))
            .then((response) => response.json())
            .then((json) => setProductsInfo(json));
    }, [selectedProducts]);

    const addProduct = (id) => {
        setSelectedProducts((prev) => [...prev, id]);
    };

    const reduceProduct = (id) => {
        const pos = selectedProducts.indexOf(id);
        if (pos !== -1) {
            //one way to reduce to state
            // const newSelectedProducts = selectedProducts.filter(
            //     (value, index) => index !== pos
            // );

            // setSelectedProducts(newSelectedProducts);

            //eloquote way
            setSelectedProducts((prev) => {
                return prev.filter((value, index) => index !== pos);
            });
        }
    };

    let subTotal = 0;
    if (selectedProducts?.length) {
        for (let id of selectedProducts) {
            if (productsInfo?.length) {
                const price = productsInfo.find((p) => p._id === id);
                subTotal += price.price;
            }
        }
    }
    const deliveryPrice = 5;
    const total = subTotal + deliveryPrice;

    return (
        <Layout>
            {!productsInfo.length && <div>no products to show</div>}
            {productsInfo.length &&
                productsInfo.map((productsInfo, i) => {
                    const amount = selectedProducts.filter(
                        (id) => id === productsInfo._id
                    ).length;
                    if (amount === 0) return;
                    return (
                        <div key={productsInfo._id} className="flex mb-5">
                            <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                                <img
                                    className="w-24"
                                    src={productsInfo.picture}
                                    alt=""
                                />
                            </div>
                            <div className="pl-4">
                                <h3 className="font-bold text-lg">
                                    {productsInfo.name}
                                </h3>
                                <p className="text-sm leading-4 text-gray-600">
                                    {productsInfo.description}
                                </p>
                                <div className="flex">
                                    <div className="grow">
                                        ${productsInfo.price}
                                    </div>
                                    <div>
                                        <button
                                            className="border border-emerald-500 px-2 rounded-lg text-emerald-500"
                                            onClick={() =>
                                                reduceProduct(productsInfo._id)
                                            }
                                        >
                                            -
                                        </button>
                                        <span className="px-2">
                                            {
                                                selectedProducts.filter(
                                                    (id) =>
                                                        id === productsInfo._id
                                                ).length
                                            }
                                        </span>
                                        <button
                                            className="bg-emerald-500 px-2 rounded-lg text-white"
                                            onClick={() =>
                                                addProduct(productsInfo._id)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            <form action="/api/checkout" method="POST">
                <div className="mt-4">
                    <input
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        className="bg-gray-100 w-full rounded-lg px-6 py-2 mb-2"
                        type="text"
                        placeholder="Street address, number"
                    />
                    <input
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        className="bg-gray-100 w-full rounded-lg px-6 py-2 mb-2"
                        type="text"
                        placeholder="City and postal code"
                    />
                    <input
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="bg-gray-100 w-full rounded-lg px-6 py-2 mb-2"
                        type="text"
                        placeholder="Your name"
                    />
                    <input
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="bg-gray-100 w-full rounded-lg px-6 py-2 mb-2"
                        type="email"
                        placeholder="Email address"
                    />
                    <div className="mt-4">
                        <div className="flex my-3">
                            <h3 className="grow font-bold text-gray-400">
                                Subtotal:
                            </h3>
                            <h3 className="font-bold">${subTotal}</h3>
                        </div>

                        <div className="flex my-3">
                            <h3 className="grow font-bold text-gray-400">
                                Delivery:
                            </h3>
                            <h3 className="font-bold">${deliveryPrice}</h3>
                        </div>

                        <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
                            <h3 className="grow font-bold text-gray-400">
                                Total:
                            </h3>
                            <h3 className="font-bold">${total}</h3>
                        </div>
                    </div>
                </div>

                <input
                    type="hidden"
                    name="products"
                    value={selectedProducts.join(",")}
                />
                <button
                    type="submit"
                    className="bg-emerald-500 px-5 py-2 text-white w-full rounded-xl font-bold mt-4 my-4 shadow-emerald-300 shadow-md"
                >
                    Pay ${total}
                </button>
            </form>
        </Layout>
    );
};

export default Checkout;
