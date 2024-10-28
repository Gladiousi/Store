"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { fetchProducts } from "../store/slice/productsSlice";
import Link from "next/link";
import Image from "next/image";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.products.status);
  const { items, category, sortOrder, searchQuery } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "reject") {
    return <p>Failed to load products.</p>;
  }

  const filteredProducts = items
    .filter(
      (product) =>
        (!category || product.category === category) &&
        (!searchQuery ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

  return (
    <div className="p-16 pt-4 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div>
            <Link
              key={product.id}
              href={`/product/${product.id}`}
            >
              <div className="flex h-5/6 rounded-xl m-4 flex-col items-center p-4 bg-gray-500 bg-opacity-55 z-10 backdrop-blur-xl hover:bg-gray-400 duration-300">
                <div className="w-full h-48 overflow-hidden relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="text-center mt-12">{product.title}</h3>
                <p>{product.price}$</p>
              </div>
            </Link>
            <button className="bg-black hover:bg-slate-600">
              add to favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
