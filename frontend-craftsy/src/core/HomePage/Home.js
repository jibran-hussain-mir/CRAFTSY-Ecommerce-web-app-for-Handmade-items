import React from "react";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";
import Carosal from "./Carosal";
import DisplayCategories from "../DisplayCategories";

const Home = () => {
  return (
    <div>
      <Carosal />
      <ProductGrid />
      {/* <DisplayCategories /> */}
    </div>
  );
};

export default Home;
