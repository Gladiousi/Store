"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { fetchProducts } from "@/store/slice/productsSlice";
import { FaArrowLeft } from "react-icons/fa";
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
    return <p className="min-h-screen flex justify-center items-center">Product not found.</p>;
  }

  return (
    <div className="p-8 lg:p-16 min-h-screen">
      <div className="flex flex-col-2 items-center bg-white p-16 rounded-lg h-full">
        <Link
          href={`/catalog`}
          className=" text-black flex items-start h-full"
        >
          <FaArrowLeft />
        </Link>
        <div className="w-full h-96 overflow-hidden relative">
          <Image
            src={product.image}
            alt={product.title}
            width={150}
            height={150}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-[60%] h-full">
          <h1 className="text-2xl font-bold flex items-start">
            {product.title}
          </h1>
          <p className="text-xl mt-4 font-semibold ">{product.price}$</p>
          <p className="text-lg mt-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
