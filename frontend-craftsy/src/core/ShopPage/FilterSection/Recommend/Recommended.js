import React from "react";
import "./Recommended.css";
import Buttons from "../Components/Buttons";

function Recommended({ handleClick }) {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Buttons onClickHandler={handleClick} value="" title="All Products" />
          <Buttons
            onClickHandler={handleClick}
            value="Watches"
            title="Watches"
          />
          <Buttons onClickHandler={handleClick} value="Pots" title="Pottery" />
        </div>
      </div>
    </>
  );
}

export default Recommended;
