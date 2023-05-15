import React, { useState } from "react";
import "./css/DisplayArea.css";
import AddProduct from "../AddProduct";
import AddCategory from "../AddCategory";

const DisplayArea = ({ path }) => {
  console.log(path);
  const loadFunctions = () => {
    if (path === "/create/product") {
      window.history.pushState({}, "Create Product", "/create/product");
      return <AddProduct />;
    } else if (path === "/create/category") {
      window.history.pushState({}, "Add Category", "/create/category");
      return <AddCategory />;
    }
  };

  return <div className="display-area">{loadFunctions()}</div>;
};

export default DisplayArea;
