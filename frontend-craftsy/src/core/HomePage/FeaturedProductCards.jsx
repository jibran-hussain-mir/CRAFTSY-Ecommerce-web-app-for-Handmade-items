import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/FeaturedProductCards.css";
import crdimg from "../../assets/bs-img1.jpg";

function FeaturedProductCards(props) {
  const navigate = useNavigate();
  const { productId } = props;
  const handleClick = () => {
    navigate(`singleproduct?id=${productId}`);
  };

  return (
    <div className="f-cont" onClick={handleClick}>
      <div className="image-cards">
        <img
          src={`http://localhost:8000/api/product/photo/${productId}`}
          alt="img"
          className="crd-img"
        />
      </div>
      <div className="dataa-cont">
        <div className="crd-h1">{props.title}</div>
        <div className="crd-h3">{props.description}</div>
        <div className="crd-p">
          <h3>Rs. {props.price}</h3>
        </div>
        <button className="crd-btn">Shop Now</button>
      </div>
    </div>
  );
}

export default FeaturedProductCards;
