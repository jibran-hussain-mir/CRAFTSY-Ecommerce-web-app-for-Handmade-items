import React, { useContext, useReducer } from "react";
import "./css/CartAddedProducts.css";
import reducer from "../Reducer/CartReducer";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { CartContext } from "../Context/CartProvider";

function CartAddedProducts({
  productId,
  name,
  price,
  quantity,
  stock,
  product_info,
}) {
  const { cart, removeFromCart, addToCart, setIncrease, setDecrease } =
    useContext(CartContext);
  console.log(productId, name, price, quantity);
  const [amount, setAmount] = useState(quantity);

  return (
    <div className="added-products-container">
      <div className="cart-product-img">
        <img
          src={`http://localhost:8000/api/product/photo/${productId}`}
          alt="ok"
          className="prdct-imgx"
        />
        <h3>{name}</h3>
      </div>
      <div className="cart-p-price">
        <h3>Rs {price}</h3>
      </div>
      <div className="cart-p-Quantity">
        <div className="cartBtn">
          <div className="amountTogglle">
            <button
              onClick={() => {
                if (amount > 1) {
                  setAmount(amount - 1);
                  setDecrease(productId);
                } else {
                  setAmount(1);
                }
              }}
              className="togglle-btns"
            >
              <FaMinus size={10} className="togglleicons" />
            </button>
            <div className="amt-sttyle">{amount}</div>
            <button
              onClick={() => {
                setAmount(amount + 1);
                if (amount < stock) {
                  setAmount(amount + 1);
                  setIncrease(productId);
                } else {
                  setAmount(stock);
                }
              }}
              className="togglle-btns"
            >
              <FaPlus size={10} className="togglleicons" />
            </button>
          </div>
        </div>
      </div>
      <div className="cart-p-total">
        <h3>{amount * price}</h3>
      </div>
      <div className="cart-p-delete">
        <AiFillDelete
          onClick={() => {
            removeFromCart(productId);
          }}
        />
      </div>
    </div>
  );
}

export default CartAddedProducts;
