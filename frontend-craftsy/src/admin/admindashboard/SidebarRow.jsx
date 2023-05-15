import React from "react";
import "./css/SidebarRow.css";

const SidebarRow = ({ Icon, label, setPath }) => {
  const handleClick = () => {
    if (label === "Add Product") setPath("/create/product");
    else if (label === "Add Category") setPath("/create/category");
  };
  return (
    <div className="list">
      <Icon className="label-icon" />
      <span className="label" onClick={handleClick}>
        {label}
      </span>
    </div>
  );
};

export default SidebarRow;
