import React from "react";
import { isAuthenticated } from "./index";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  if (!isAuthenticated()) {
    {
      return <Navigate to="/signin" />;
    }
  } else return <Component />;

  return <></>;
};

export default PrivateRoute;
