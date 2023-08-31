import React, { createContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/CartReducer.js";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const getCartData = () => {
    const localCartData = localStorage.getItem("myCart");
    if (!localCartData) return [];
    return JSON.parse(localStorage.getItem("myCart"));
  };

  const initialState = {
    cart: getCartData(),
    total_amount: "",
    total_items: "",
    shipping_fee: 500,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const addToCart = (id, name, price, createdBy, quantity, product_info) => {
    console.log(quantity);
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, name, price, createdBy, quantity, product_info },
    });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const setIncrease = (id) => {
    dispatch({ type: "SET_INCREASE", payload: id });
  };

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREASE", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  useEffect(() => {
    dispatch({ type: "CART_ITEM_UPDATE" });
    dispatch({ type: "TOTAL_AMOUNT_UPDATE" });
    console.log(`hahahahahahah ${JSON.stringify(state.cart)}`);
    localStorage.setItem("myCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        clearCart,
        setIncrease,
        setDecrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
