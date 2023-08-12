import React from "react";
import "./SideBar.css";
import Category from "./Category";
import Price from "./Price";

function SideBar({ handleChange, handleCategoryChange }) {
  return (
    <>
      <section className="f-sidebar">
        <div className="f-logo-container">
          <h1>🛒</h1>
        </div>
        <div>
          <Category
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        <div>
          <Price handleChange={handleChange} />
        </div>
      </section>
    </>
  );
}

export default SideBar;
