import React, { useState, useEffect } from "react";
import CategoryCarosal from "./HomePage/CategoryCarosal";

const DisplayCategories = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/categories`, {
          method: "GET",
        });
        const data = await response.json();
        setCategoryData([...categoryData, ...data]);
      } catch (e) {
        console.log(e);
      }
    };

    getCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <CategoryCarosal />
      {/* {JSON.stringify(categoryData)} */}
    </div>
  );
};

export default DisplayCategories;
