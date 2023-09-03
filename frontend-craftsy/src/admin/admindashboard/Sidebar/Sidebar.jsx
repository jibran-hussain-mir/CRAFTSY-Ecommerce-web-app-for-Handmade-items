import React from "react";
import { NavLink } from "react-router-dom";
import "./css/Sidebar.css";
import { isAuthenticated } from "../../../auth";
import { BiCategoryAlt } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiUserCheck } from "react-icons/bi";

const Sidebar = ({ setPath }) => {
  const { user, token } = isAuthenticated();

  return (
    <div className="side-panel">
    
      <ul>
        <p className="user-x-x-name">{user.name}</p>
        <p>ADMIN</p>
        <hr />
        <NavLink to="create/category">
          {" "}
          <li className="liicon">
            <div className="ppshow">Add Category</div>
            <BiCategoryAlt size={22} className="pphide" />
          </li>
        </NavLink>
        <NavLink to="create/product">
          {" "}
          <li className="liicon">
            <div className="ppshow">Add Product</div>
            <MdProductionQuantityLimits size={22} className="pphide" />
          </li>
        </NavLink>
        <NavLink to="purchase-history">
          {" "}
          <li className="liicon">
            <div className="ppshow">Purchase History</div>
            <AiOutlineHistory size={22} className="pphide" />
          </li>
        </NavLink>
        <NavLink to="orders">
          {" "}
          <li className="liicon">
            <div className="ppshow">Customer Orders</div>
            <BsFillCartCheckFill size={22} className="pphide" />
          </li>
        </NavLink>
        <NavLink to="manage-products">
          {" "}
          <li className="liicon">
            <div className="ppshow">Manage Products</div>
            <BsFillCartCheckFill size={22} className="pphide" />
          </li>
        </NavLink>
        <NavLink to="/admin/dashboard/profile/:userId">
          {" "}
          <li className="liicon">
            <div className="ppshow">Update Profile</div>
            <BiUserCheck size={22} className="pphide" />
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
