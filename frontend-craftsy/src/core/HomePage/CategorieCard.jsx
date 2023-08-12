import React, { useEffect, useState } from "react";
import "./css/CategorieCard.css";
import { fetchCategories } from "../apiCore";
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
import Carousel from "react-elastic-carousel";
import ProductSlider from "./ProductSlider";

const breakpoints = [
  { width: 1, itemsToShow: 2 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 3 },
];

function CategorieCard() {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    fetchCategories()
      .then((data) => {
        console.log(data);
        setCategories([...data]);
      })
      .catch((e) => console.log(`eeeeeerrror: ${e}`));
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Carousel breakPoints={breakpoints}>
      {categories.map((category) => (
        <ProductSlider
          productId={category._id}
          title={category.name}
          img1={category.photo}
          img2={category.photo}
        />
      ))}
    </Carousel>
  );
}

export default CategorieCard;
