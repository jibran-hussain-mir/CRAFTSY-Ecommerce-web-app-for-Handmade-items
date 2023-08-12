import React from "react";
import "./css/Testimonial.css";

function Testimonials(props) {
  return (
    <div className="testi-container">
      <img src={props.srcx} alt="users" className="user-image" />
      <h3 className="testimonial-text">{props.testimonial}</h3>
      <h4 className="user-name">{props.name}</h4>
    </div>
  );
}

export default Testimonials;
