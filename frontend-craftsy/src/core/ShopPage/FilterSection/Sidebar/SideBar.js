import React from "react";
import "./SideBar.css";
import Category from "./Category";
import Price from "./Price";

function SideBar({
  handleChange,
  handleCategoryChange,
  checked,
  handlePriceChange,
}) {
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
            checked={checked}
            handlePriceChange={handlePriceChange}
          />
        </div>
        <div>
          <Price
            handleChange={handleChange}
            handlePriceChange={handlePriceChange}
          />
        </div>
      </section>
    </>
  );
}

export default SideBar;
