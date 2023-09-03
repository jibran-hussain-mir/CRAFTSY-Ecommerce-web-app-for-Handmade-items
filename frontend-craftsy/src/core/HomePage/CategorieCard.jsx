import React, { useEffect, useState } from "react";
import "./css/CategorieCard.css";
import { fetchCategories } from "../apiCore";
import { Bars } from "react-loader-spinner";
import Carousel from "react-elastic-carousel";
import ProductSlider from "./ProductSlider";

const breakpoints = [
  { width: 1, itemsToShow: 2 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 4 },
];

function CategorieCard() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCategories = () => {
    fetchCategories()
      .then((data) => {
        console.log(data);
        setCategories([...data]);
        setLoading(false);
      })
      .catch((e) => console.log(`eeeeeerrror: ${e}`));
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {loading ? (
        <Bars
          height="80"
          width="80"
          color="#8A4AF3"
          ariaLabel="bars-loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          wrapperClass=""
          visible={true}
        />
      ) : (
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
      )}
    </>
  );
}

export default CategorieCard;
