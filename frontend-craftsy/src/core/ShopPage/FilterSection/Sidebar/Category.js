import React, { useEffect, useState } from "react";
import "./Category.css";
import Input from "../Components/Input";
import { fetchCategories } from "../../../apiCore";

function Category({ handleChange, handleCategoryChange, checked }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const getCategoies = async () => {
    try {
      const data = await fetchCategories();
      console.log(data);
      setCategories([...data]);
    } catch (e) {
      setError(e);
    }
  };
  useEffect(() => {
    getCategoies();
  }, []);
  return (
    <div>
      {/* {JSON.stringify(categories)}
      {JSON.stringify(error)} */}
      <h2 className="sidebar-title">Category</h2>
      <div className="cate-cont-f">
        {/* <label className="sidebar-label-container">
          <input type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>*/}
        {categories.map((category, index) => (
          <Input
            key={index}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange(category._id)}
            value={category._id}
            title={category.name}
            checked={checked.includes(category._id)} // Pass checked status here
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
