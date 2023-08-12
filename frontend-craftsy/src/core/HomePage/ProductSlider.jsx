import React from "react";
import "./css/ProductSlider.css";
import { useState } from "react";

function ProductSlider(props) {
  console.log(`category`, props.img1);
  console.log(props.productId);
  return (
    <div className="categories-card">
      <div className="image-cards">
        <img
          src={`http://localhost:8000/api/category/photo/${props.productId}`}
          alt="img"
          className="image-of-card"
        />
      </div>
      <div className="card-heading">{props.title}</div>
      <div className="card-pirce">
        <h3>{props.price}</h3>
      </div>
      <button className="shopnow-btn">Shop Now</button>
    </div>
  );
}

export default ProductSlider;
