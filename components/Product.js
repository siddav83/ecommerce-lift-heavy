import React, { useContext } from "react";
import Image from "next/image";
import { ProductContext } from "./ProductContext";
const Product = (products) => {
    console.log(products.picture, "_____________________________");
    const { setSelectedProducts } = useContext(ProductContext);

    return (
        <div className="w-64">
            <div className="bg-orange-50 p-5 rounded-lg">
                {products.picture && (
                    <Image
                        width={220}
                        height={180}
                        src={products.picture}
                        alt="yellow fat silverside biltong"
                    />
                )}
            </div>

            <div className="mt-2">
                <h3 className="font-bold text-lg">{products.name}</h3>
                <p className="text-sm mt-2 leading-4">{products.description}</p>
                <div className="flex">
                    <div className="self-center text-3xl font-bold grow">
                        £{products.price}
                    </div>
                    <button
                        // onClick={addProduct}
                        className="bg-emerald-500 text-white font-bold py-2 px-4 mt-2 rounded-xl"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
