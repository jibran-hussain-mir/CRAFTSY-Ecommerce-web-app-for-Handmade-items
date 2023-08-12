import React from "react";
import "./css/SidebarRow.css";
import { useNavigate } from "react-router-dom";

const SidebarRow = ({ Icon, label, setPath }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (label === "Add Product") navigate("/admin/dashboard/create/product");
    else if (label === "Add Category")
      navigate("/admin/dashboard/create/category");
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
