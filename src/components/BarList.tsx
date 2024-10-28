'use client';

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { setCategory, setSortOrder, setSearchQuery } from "../store/slice/productsSlice";

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
  const [searchInput, setSearchInput] = useState('');

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setCategory(event.target.value || null));
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSortOrder(event.target.value as "asc" | "desc"));
  };

  const handleSearchSubmit = () => {
    dispatch(setSearchQuery(searchInput)); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="m-12 p-4 mb-0 bg-gray-400 rounded-lg">
      <div className="flex justify-between items-center">
      <label>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
        />
        <button onClick={handleSearchSubmit}>Search</button>
      </label>
        <div className="flex gap-x-8 ">
          <label>
            Category:
            <select value={category || ""} onChange={handleCategoryChange}>
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sort by price:
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BarList;
