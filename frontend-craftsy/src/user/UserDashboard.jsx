import React from "react";
import { isAuthenticated } from "../auth";
import Header from "../core/Header";

const UserDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  return (
    <>
      <Header />
      <div>
        <h3> Name : {name}</h3>
        <h3>Email: {email} </h3>
        <h3>Role : {role === 0 ? "Regular User" : "Admin"}</h3>
      </div>
    </>
  );
};

export default UserDashboard;
