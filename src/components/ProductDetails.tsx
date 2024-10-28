"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation"; 
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { fetchProducts } from "../store/slice/productsSlice";
import Link from "next/link"; 
import Image from "next/image";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const product = useSelector((state: RootState) =>
    state.products.items.find((product) => product.id === Number(id))
  );
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="p-16 min-h-screen">
      <Link href="/catalog" className="mt-8 text-blue-500 hover:underline">
        Back to Catalog
      </Link>
      <div className="flex flex-col items-center">
        <div className="w-full h-96 overflow-hidden relative">
          <Image
            src={product.image}
            alt={product.title}
            width={150}
            height={150}
            className="object-contain w-full h-full"
          />
        </div>
        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
        <p className="text-lg mt-2">{product.description}</p>
        <p className="text-xl mt-4 font-semibold">{product.price}$</p>
      </div>
    </div>
  );
}
