import React from "react";
import "../css/CategorieCard.css";
import handi2 from "./../../assets/handi1.jpg";
import handi1 from "./../../assets/handi2.jpg";
import tshirt1 from "./../../assets/tshirt1.jpg";
import tshirt2 from "./../../assets/tshirt2.jpg";
import clothe1 from "./../../assets/clothe1.jpg";
import clothe2 from "./../../assets/clothe2.jpg";
import pottery1 from "./../../assets/pottery1.jpg";
import pottery2 from "./../../assets/pottery2.jpg";
import rugimg1 from "./../../assets/rugimg1.jpg";
import rugimg2 from "./../../assets/rugimg2.jpg";
// import Carousel from "react-elastic-carousel";
import ProductSlider from "./ProductSlider";

function CategorieCard() {
  return (
    <div className="category-container">
      <ProductSlider
        title="T-Shirt"
        price="$33"
        img1={tshirt1}
        img2={tshirt2}
      />
      <ProductSlider
        title="Carpets"
        price="$4433"
        img1={rugimg1}
        img2={rugimg2}
      />
      <ProductSlider
        title="Pottery"
        price="$343"
        img1={pottery1}
        img2={pottery2}
      />
      <ProductSlider
        title="Handicraft Arts"
        price="$933"
        img1={handi1}
        img2={handi2}
      />
      <ProductSlider
        title="Clothes"
        price="$133"
        img1={clothe1}
        img2={clothe2}
      />
    </div>
  );
}

export default CategorieCard;
