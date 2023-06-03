import React, { useState } from "react";
import { fetchCategories } from "./apiCore";

const DisplayCategories = () => {
  const [categoryData, setCategoryData] = useState([]);

  const getCategories = async () => {
    try {
      const categories = await fetchCategories();
      console.log(categories);
    } catch (e) {
      console.log(e);
    }
    // setCategoryData(...categoryData, categories);
  };

  return (
    <div>
      <h2>Categories</h2>
      {getCategories()}
    </div>
  );
};

export default DisplayCategories;
