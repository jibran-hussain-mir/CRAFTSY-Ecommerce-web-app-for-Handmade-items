import React from "react";
import "./Products.css";

function Products({ result }) {
  return (
    <>
      <section className="f-card-container">{result}</section>
    </>
  );
}

export default Products;
