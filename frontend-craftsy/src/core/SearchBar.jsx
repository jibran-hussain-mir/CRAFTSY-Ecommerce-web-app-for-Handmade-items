import React, { useEffect, useState } from "react";
import { fetchCategories } from "../admin/adminapi";

const SearchBar = () => {
  const [data, setData] = useState({
    categories: [],
    categorySelected: "",
    searchValue: "",
    result: [],
    searched: false,
  });

  const { categories, categorySelected, searchValue, result, searched } = data;

  const loadCategories = () => {
    fetchCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchData = () => {
    console.log(data.searchValue, data.categorySelected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      {/* Category Dropdown */}
      <select
        value={categorySelected}
        onChange={handleChange("categorySelected")}
      >
        <option value="All" disabled>
          Pick a category
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {/* Search Bar */}
      <input
        type="search"
        value={searchValue}
        onChange={handleChange("searchValue")}
        placeholder="Search"
      />
      {/* Search Button */}
      <button>Search</button>
    </form>
  );

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      {searchForm()}
      {JSON.stringify(data.searchValue)}
    </div>
  );
};

export default SearchBar;
