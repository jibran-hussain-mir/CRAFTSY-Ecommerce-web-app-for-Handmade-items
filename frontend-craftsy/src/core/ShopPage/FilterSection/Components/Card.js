import React from "react";

function Card({ img, title, star, price }) {
  return (
    <>
      <section className="f-card">
        <img src={img} alt={title} className="f-card-img" />
        <div className="f-card-details">
          <h3 className="f-card-title">{title}</h3>
          <section className="card-reviews">
            {star} {star} {star}
            <span className="total-reviews">4</span>
          </section>
          <section className="card-price">
            <div className="f-prices">{price}</div>
            <div className="fbtn-addtocard">Add to Cart</div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Card;
