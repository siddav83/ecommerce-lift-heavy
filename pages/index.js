import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        const getData = async () => {
            const res = await fetch("http://localhost:3000/api/products");
            const data = await res.json();
            console.log(data, "____________________________________________");
        };
        getData();
    }, []);
    return (
        <div className="p-5">
            <div>
                <h2 className="font-bold text-2xl">Biltong</h2>
                <div className="py-4">
                    <div className="w-64">
                        <div className="bg-orange-50 p-5 rounded-lg">
                            <Image
                                src="/products/grass-fed-biltong.jpg"
                                width={220}
                                height={180}
                                alt="yellow fat silverside biltong"
                            />
                        </div>
                        <div className="mt-2">
                            <h3 className="font-bold text-lg">
                                Sliced Biltong
                            </h3>
                            <p className="text-sm mt-2 leading-4">
                                Delicious Yellow Fat Biltong with flavour like
                                no other! It doesn’t get better than this. This
                                product is subject to availability.
                            </p>
                            <div className="flex">
                                <div className="self-center text-3xl font-bold grow">
                                    £8.99
                                </div>
                                <button className="bg-amber-200 text-white font-bold py-2 px-4 mt-2 rounded-xl">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
