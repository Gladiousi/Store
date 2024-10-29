"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/index";
import { fetchProducts, toggleFavorite, removeFavorite } from "@/store/slice/productsSlice";
import Link from "next/link";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.products.status);
  const { items, favorites, category, sortOrder, searchQuery } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <p className="flex h-screen justify-center items-center">Loading...</p>
    );
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

  const hasProducts = filteredProducts.length > 0;

  return (
    <div className="p-2 md:p-8 lg:p-16 pt-4 min-h-screen z-10">
      {hasProducts ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-10">
          {filteredProducts.map((product) => {
            const isFavorite = favorites.some((fav) => fav.id === product.id);
            return (
              <div key={product.id} className="relative block">
                <Link href={`/product/${product.id}`}>
                  <div className="flex h-5/6 rounded-xl m-4 flex-col items-center p-4 bg-white backdrop-blur-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105">
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
                <button
                  onClick={() => {
                    isFavorite 
                      ? dispatch(removeFavorite(product.id)) 
                      : dispatch(toggleFavorite(product));
                  }}
                  className={`absolute top-10 right-10 z-10 transition-colors duration-300 transform hover:scale-105 ${
                    isFavorite ? "text-red-500" : "text-white"
                  }`}
                >
                  {isFavorite ? (
                    <FaHeart size={30} />
                  ) : (
                    <FaRegHeart className="text-black" size={30} />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="flex mt-24 justify-center items-center">Товары не найдены.</p>
      )}
    </div>
  );
}
