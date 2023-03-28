import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import About from "./core/About";
import Cart from "./core/Cart";
import UserDashBoard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import UserDashboard from "./user/UserDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signin />}></Route>
        <Route
          path="/user/dashboard"
          element={<PrivateRoute Component={UserDashBoard} />}
        />
        <Route
          path="/admin/dashboard"
          element={<AdminRoute Component={AdminDashboard} />}
        />
        <Route
          path="/create/category"
          element={<AdminRoute Component={AddCategory} />}
        />
        <Route
          path="/create/product"
          element={<AdminRoute Component={AddProduct} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
