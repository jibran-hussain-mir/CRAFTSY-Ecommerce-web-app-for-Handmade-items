import React from "react";
import { isAuthenticated } from "./index";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ Component }) => {
  console.log(isAuthenticated());
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  } else if (isAuthenticated() && isAuthenticated().user.role === 1) {
    return <Component />;
  } else if (isAuthenticated() && isAuthenticated().user.role === 0) {
    return <Navigate to="/" />;
  }
};

export default AdminRoute;
