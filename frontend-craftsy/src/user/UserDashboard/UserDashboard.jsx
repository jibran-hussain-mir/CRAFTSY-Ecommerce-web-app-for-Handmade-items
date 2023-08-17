import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import Header from "../../core/Header";
import { Link } from "react-router-dom";
import "./css/UserDasboard.css";
import PurchasedProducts from "./PurchasedProducts";
import { getPurchaseHistory } from "../apiUser";
const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const userId = isAuthenticated()?.user?._id;
  const token = isAuthenticated()?.token;

  return (
    <>
      <Header />
      <div className="userDashboardContainer">
        <div className="userDash-details">
          <h2>Name : {name}</h2>

          <h2>Email : {email}</h2>

          <h2>Role : {role === 0 ? "Regular User" : "Admin"}</h2>
        </div>
        <div className="userdashBtns">
          <button className="userDBbtns">Update Profile</button>
        </div>
        <hr className="pphr" />
        <div className="pp-head">
          <h1>Pruchased Products</h1>
        </div>
        <div className="userPurProducts">
          <PurchasedProducts />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
