import React from "react";
import "./css/PurchasedProducts.css";

function PurchasedProducts() {
  return (
    <div>
      {" "}
      <div className="ph-ul">
        <ul className="u-list-ph">
          <li>
            <img alt="aaa" className="imgofpro" />
          </li>
          <li>Shawl</li>
          <li>15/4/2023</li>
          <li>$900</li>
        </ul>
      </div>
    </div>
  );
}

export default PurchasedProducts;
