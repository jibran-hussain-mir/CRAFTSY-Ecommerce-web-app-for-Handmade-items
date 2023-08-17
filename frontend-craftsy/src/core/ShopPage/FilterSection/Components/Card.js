import React, { useContext } from "react";
import { CartContext } from "../../../../Context/CartProvider";
import { useNavigate } from "react-router-dom";

function Card({ img, title, star, price, productId, product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const handleClick = () => {
    addToCart(
      product?._id,
      product?.name,
      product?.price,
      product?.createdBy,
      1,
      product
    );
    navigate("/cart");
  };

  return (
    <>
      <section className="f-card">
        <img
          src={`http://localhost:8000/api/product/photo/${productId}`}
          alt={title}
          className="f-card-img"
        />
        <div className="f-card-details">
          <h3 className="f-card-title">{title}</h3>
          <section className="card-reviews">
            <div className="f-prices">Rs. {price}</div>
          </section>
          <section className="card-price">
            <div
              className="fbtn-addtocard"
              onClick={() => navigate(`/singleproduct?id=${productId}`)}
            >
              View
            </div>
            <div className="fbtn-addtocard" onClick={handleClick}>
              Add toCart
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Card;
