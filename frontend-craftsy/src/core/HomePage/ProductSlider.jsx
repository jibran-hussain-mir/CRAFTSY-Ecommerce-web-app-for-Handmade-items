import React from "react";
import "./css/ProductSlider.css";
import { NavLink } from "react-router-dom";

function ProductSlider(props) {
  console.log(`category`, props.img1);
  console.log(props.productId);

  return (
    <div className="categories-card">
      <div className="image-cards">
        <img
          src={`${process.env.REACT_APP_API_URL}/category/photo/${props.productId}`}
          alt="img"
          className="image-of-card"
        />
      </div>
      <hr className="card-kiline" />
      <div className="card-heading">{props.title}</div>
      <div className="card-pirce">
        <h3>{props.price}</h3>
      </div>
      <NavLink
        to={{
          pathname: "/shop",
          search: `?categoryId=${props.productId}`,
        }}
      >
        <button className="shopnow-btn">Shop Now</button>
      </NavLink>
    </div>
  );
}

export default ProductSlider;
