import React from "react";
import { NavLink } from "react-router-dom";
import "./css/Sidebar.css";
import { isAuthenticated } from "../../../auth";

const Sidebar = ({ setPath }) => {
  const { user, token } = isAuthenticated();

  return (
    <div className="side-panel">
      <div className="users-image-small">
        <img
          src={
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
          }
          alt="userimg"
          className="admin-user-img"
        />
      </div>
      <ul>
        <li>{user.name}</li>
        <p>ADMIN</p>
        <hr />
        <NavLink to="create/category">
          {" "}
          <li>Add Category</li>
        </NavLink>
        <NavLink to="create/product">
          {" "}
          <li>Add Product</li>
        </NavLink>
        <NavLink to="purchase-history">
          {" "}
          <li>My Purchase History</li>
        </NavLink>
        <NavLink to="orders">
          {" "}
          <li>Customer Orders</li>
        </NavLink>
        <NavLink to="/">
          {" "}
          <li>Update Profile</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
