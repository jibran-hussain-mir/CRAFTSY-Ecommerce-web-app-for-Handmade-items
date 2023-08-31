import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { ProductProvider } from "./Context/ProductProvider";
import { CartProvider } from "./Context/CartProvider";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
root.render(
  <ProductProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ProductProvider>
);
