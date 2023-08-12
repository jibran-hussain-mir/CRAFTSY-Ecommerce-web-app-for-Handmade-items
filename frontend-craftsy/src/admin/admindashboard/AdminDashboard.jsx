import React, { useState } from "react";
import { isAuthenticated } from "../../auth";
import Header from "../../core/Header";
import Sidebar from "./Sidebar/Sidebar";
import "./css/AdminDashboard.css";
import AddProduct from "../AddProduct";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [path, setPath] = useState(window.location.pathname);
  return (
    <>
      <Header />
      <div className="admin-panel">
        <Sidebar setPath={setPath} />
        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;

{
  /* <div>
        <h3> Name : {name}</h3>
        <h3>Email: {email} </h3>
        <h3>Role : {role === 0 ? "Regular User" : "Admin"}</h3>
      </div> */
}
