import React from "react";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";
import Carosal from "./Carosal";

const Home = () => {
  return (
    <div>
      <Carosal />
      <ProductGrid />
    </div>
  );
};

export default Home;
