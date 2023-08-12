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

  const [orders, setOrders] = useState([]);
  const getOrderList = async () => {
    try {
      const data = await getPurchaseHistory(userId, token);
      setOrders([...data]);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getOrderList();
  }, []);
  return (
    <>
      <Header />
      {JSON.stringify(orders)}
      <div>
        <h3> Name : {name}</h3>
        <h3>Email: {email} </h3>
        <h3>Role : </h3>
      </div>

      <div className="main-big-cont">
        <div className="user-d-container">
          <div className="main-user">
            <ul className="u-list-pg">
              <li>
                <img alt="im" className="imgofuser" />
              </li>
              <li className="li-btns">
                <Link to={`/profile/${_id}`}>Update Profile</Link>
              </li>
              <li className="li-btns">Update Password</li>
            </ul>
          </div>
          <div className="user-content">
            <div className="user-c-con">
              <div>
                <h2>Name : {name}</h2>
              </div>
              <div>
                <h2>Email : {email}</h2>
              </div>
              <div>
                <h2>Role : {role === 0 ? "Regular User" : "Admin"}</h2>
              </div>
            </div>
            <div>
              <hr className="ded-hr" />
              <h1>Purchase History:</h1>
              <div className="scr-div">
                {/* {orders.map((product) => (
                  <PurchasedProducts />
                ))} */}

                <PurchasedProducts />
                <PurchasedProducts />
                <PurchasedProducts />
                <PurchasedProducts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
