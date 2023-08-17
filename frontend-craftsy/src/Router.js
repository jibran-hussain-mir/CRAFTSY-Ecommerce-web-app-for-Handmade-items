import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import SellerSignup from "./user/SellerSignup";
import Home from "./core/HomePage/Home";
import About from "./core/About";
import Cart from "./core/Cart";
import UserDashBoard from "./user/UserDashboard/UserDashboard";
import AdminDashboard from "./admin/admindashboard/AdminDashboard";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import UserDashboard from "./user/UserDashboard/UserDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ErrorPage from "./ErrorPage";
import Layout from "./core/Layout";
import SingleProduct from "./SingleProduct";
import SearchBar from "./core/SearchBar";
import Order from "./admin/Orders/CustomerOrders";
import Profile from "./user/Profile";
import AdminPurchaseHistory from "./admin/AdminPurchaseHistory";
import UpdateProduct from "./admin/UpdateProduct";
import FilterSectionPage from "./core/ShopPage/FilterSectionPage";
import ManageProduct from "./admin/ManageProduct";

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
