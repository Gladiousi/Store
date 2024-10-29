"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/index";
import {
  setCategory,
  setSortOrder,
  setSearchQuery,
} from "@/store/slice/productsSlice";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const BarList: React.FC = () => {
  const dispatch = useAppDispatch();
  const category = useSelector((state: RootState) => state.products.category);
  const sortOrder = useSelector((state: RootState) => state.products.sortOrder);
  const [searchInput, setSearchInput] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value || null;
    dispatch(setCategory(selectedCategory));
    setFilterActive(selectedCategory !== null || sortOrder !== "asc");
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSortOrder(event.target.value as "asc" | "desc"));
    setFilterActive(category !== null || event.target.value !== "asc");
  };

  const handleSearchSubmit = () => {
    dispatch(setSearchQuery(searchInput));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
    if (dropdownVisible) {
      setFilterActive(category !== null || sortOrder !== "asc");
    } else {
      setFilterActive(true);
    }
  };

  return (
    <div className="sticky m-4 lg:m-12 lg:mb-4 p-4 mb-0 bg-gray-700 rounded-lg backdrop-blur-lg opacity-90 z-40">
      <div className="flex justify-between items-center relative">
        <label className="flex gap-x-4 items-center">
          <button onClick={handleSearchSubmit}>
            <FaMagnifyingGlass />
          </button>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="border-none text-white bg-transparent focus:outline-none hover:cursor-text w-[80%] md:w-[70%]"
          />
        </label>

        <button className="lg:hidden text-white" onClick={toggleDropdown}>
          {filterActive ? <CiFilter /> : <FaFilter />}
        </button>

        {dropdownVisible && (
          <div className="absolute top-12 right-0 w-full bg-gray-700 rounded-lg p-4 lg:hidden z-30">
            <label className="block mb-2">
              <select
                value={category || ""}
                onChange={handleCategoryChange}
                className="w-full bg-gray-600 text-white rounded-lg p-2 focus:outline-none"
              >
                <option value="">All categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mb-2">
              <select
                value={sortOrder}
                onChange={handleSortOrderChange}
                className="w-full bg-gray-600 text-white rounded-lg p-2 focus:outline-none"
              >
                <option value="asc">По возрастанию</option>
                <option value="desc">По убыванию</option>
              </select>
            </label>
          </div>
        )}

        <div className="hidden lg:flex gap-x-8 z-30">
          <label>
            <select
              value={category || ""}
              onChange={handleCategoryChange}
              className="bg-gray-600 text-white rounded-lg p-2 focus:outline-none"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label>
            <select
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="bg-gray-600 text-white rounded-lg p-2 focus:outline-none"
            >
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BarList;
