import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/HomePage/Home";
import About from "./core/About";
import Cart from "./core/Cart";
import UserDashBoard from "./user/UserDashboard";
import AdminDashboard from "./admin/admindashboard/AdminDashboard";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import UserDashboard from "./user/UserDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ErrorPage from "./ErrorPage";
import Layout from "./core/Layout";
import SingleProduct from "./SingleProduct";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/singleproduct"
            element={<SingleProduct element={<SingleProduct />} />}
          />
        </Route>

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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
