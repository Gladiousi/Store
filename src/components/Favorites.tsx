"use client";

import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/index";
import { toggleFavorite, removeFavorite } from "@/store/slice/productsSlice";
import { useEffect } from "react";
import { Product } from "@/types/Product";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.products);

  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };

  useEffect(() => {
    const savedFavorites: Product[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as Product[];
    savedFavorites.forEach((favorite) => {
      dispatch(toggleFavorite(favorite));
    });
  }, [dispatch]);
  
  return (
    <div className="p-16 min-h-screen">
      <Link
          href={`/catalog`}
          className=" text-black flex items-start h-full"
        >
          <FaArrowLeft />
        </Link>
      
      {favorites.length === 0 ? (
        <p className="flex text-center justify-center items-center h-[70dvh]">
          No favorite products found.
        </p>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((product) => (
              <div key={product.id} className="relative block">
              <Link href={`/product/${product.id}`}>
                <div className="flex h-5/6 rounded-xl m-4 flex-col items-center p-4 bg-white z-10 backdrop-blur-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105">
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
                onClick={() => dispatch(removeFavorite(product.id))}
                className={`absolute top-10 right-10 z-10 transition-colors duration-300 text-red-500`}
              >
                <FaHeart size={30}/>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
