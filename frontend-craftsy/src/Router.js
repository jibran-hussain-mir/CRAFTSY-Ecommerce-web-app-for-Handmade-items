import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./user/Signin.jsx";
import Signup from "./user/Signup.jsx";
import SellerSignup from "./user/SellerSignup.jsx";
import Home from "./core/HomePage/Home.js";
import About from "./core/About.jsx";
import Cart from "./core/Cart.jsx";
import UserDashBoard from "./user/UserDashboard/UserDashboard.jsx";
import AdminDashboard from "./admin/admindashboard/AdminDashboard.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import AdminRoute from "./auth/AdminRoute.jsx";
import UserDashboard from "./user/UserDashboard/UserDashboard.jsx";
import AddCategory from "./admin/AddCategory.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Layout from "./core/Layout.jsx";
import SingleProduct from "./SingleProduct.js";
import SearchBar from "./core/SearchBar.jsx";
import Order from "./admin/Orders/CustomerOrders.jsx";
import Profile from "./user/Profile.jsx";
import AdminPurchaseHistory from "./admin/AdminPurchaseHistory.jsx";
import UpdateProduct from "./admin/UpdateProduct.jsx";
import FilterSectionPage from "./core/ShopPage/FilterSectionPage.jsx";
import ManageProduct from "./admin/ManageProduct.jsx";
import ForgotPassword from "./user/ForgotPassword.jsx";
import ResetPassword from "./user/ResetPassword.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/seller-signup" element={<SellerSignup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          ></Route>

          <Route
            path="/singleproduct"
            element={<SingleProduct element={<SingleProduct />} />}
          />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<FilterSectionPage />} />
        <Route path="/signup" element={<Signin />}></Route>
        <Route
          path="/user/dashboard"
          element={<PrivateRoute Component={UserDashBoard} />}
        />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={<AdminRoute Component={AdminDashboard} />}
        >
          <Route index element={<AdminRoute Component={Order} />} />
          <Route
            path="create/category"
            element={<AdminRoute Component={AddCategory} />}
          />
          <Route
            path="create/product"
            element={<AdminRoute Component={AddProduct} />}
          />
          <Route
            path="purchase-history"
            element={<AdminRoute Component={AdminPurchaseHistory} />}
          />
          <Route path="orders" element={<AdminRoute Component={Order} />} />
          <Route
            path="manage-products"
            element={<AdminRoute Component={ManageProduct} />}
          />
          <Route
            path="update-product/:productId"
            element={<AdminRoute Component={UpdateProduct} />}
          />
          <Route
            path="profile/:userId"
            element={<AdminRoute Component={Profile} />}
          />
        </Route>

        <Route
          path="/profile/:userId"
          element={<PrivateRoute Component={Profile} />}
        />

        <Route path="/search" element={<SearchBar />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
