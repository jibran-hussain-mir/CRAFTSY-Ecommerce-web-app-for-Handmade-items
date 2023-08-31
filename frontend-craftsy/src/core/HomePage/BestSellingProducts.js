import React from "react";
import "./css/BestSellingProducts.css";
import { useNavigate } from "react-router-dom";

function BestSellingProducts(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`singleproduct?id=${props.productId}`);
  };
  const imgUrl = `${process.env.REACT_APP_API_URL}/product/photo/${props.productId}`;
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="content">
        <h2 className="title">{props.title}</h2>
        <p className="copy">{props.copy}</p>
        <button className="btn" onClick={handleClick}>
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default BestSellingProducts;
