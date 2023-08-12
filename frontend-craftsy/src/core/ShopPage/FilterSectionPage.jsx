import React, { useState } from "react";
import SideBar from "./FilterSection/Sidebar/SideBar";
import Products from "./FilterSection/Products/Products";
import Recommended from "./FilterSection/Recommend/Recommended";
import "./FilterSectionPage.css";
import products from "./FilterSection/Data";
import Card from "./FilterSection/Components/Card";

function FilterSectionPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [checked, setChecked] = useState([]);

  //InputFilter
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCategoryChange = (c) => () => {
    console.log(`Hello world`);
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
  };

  const filteredItems = products.filter((product) =>
    product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase() !== -1)
  );

  //RadioFilters
  const handleChange = (event) => {
    console.log("world");
    setSelectedCategory(event.target.value);
  };

  //btnsFilters
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  //filteredData
  function filteredData(products, selected, query) {
    let filteredProducts = products;
    //filtering input items
    if (query) {
      filteredProducts = filteredItems;
    }
    //selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, price, title }) =>
          category === selected || price === selected || title === selected
      );
    }
    return filteredProducts.map(({ img, title, star, reviws, price }) => (
      <Card
        key={Math.random()}
        img={img}
        title={title}
        star={star}
        reviws={reviws}
        price={price}
      />
    ));
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <>
      <div className="fspage-contianer">
        <div className="rd">
          <SideBar
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="filter-flex">
          <Recommended className="fixx" handleClick={handleClick} />
          <Products result={result} />
        </div>
      </div>
    </>
  );
}

export default FilterSectionPage;
