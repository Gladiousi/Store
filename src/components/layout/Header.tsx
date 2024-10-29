"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-around p-6 m-2 rounded-xl items-center bg-gray-800 bg-opacity-55 z-10 backdrop-blur-xl">
      <div>
        <div className="hover:text-gray-100 duration-500">
          <Link href={`/catalog`}>FakeStore</Link>
        </div>
      </div>

      <div className="flex">
        <div className="hover:text-gray-100 duration-500">
          <Link href={`/favorites/`}>Favoritets</Link>
        </div>
      </div>
    </div>
  );
}
