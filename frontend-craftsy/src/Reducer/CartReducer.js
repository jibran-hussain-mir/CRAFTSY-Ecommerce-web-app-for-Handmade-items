import React from "react";

const CartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    const { id, name, price, createdBy, quantity, product_info } =
      action.payload;
    console.log(
      `Here is my product info details : ${JSON.stringify(product_info)}`
    );
    console.log("subah hogayi mamu", product_info);

    const existing = state.cart.find((product) => product.id === id);
    if (existing) {
      const updatedCart = state.cart.map((product) => {
        if (product.id === id) {
          let newQuantity = product.quantity + quantity;
          if (newQuantity > product_info.quantity)
            newQuantity = product_info.quantity;
          return {
            ...product,
            quantity: newQuantity,
          };
        } else {
          return product;
        }
      });
      return {
        ...state,
        cart: updatedCart,
      };
    } else {
      console.log(product_info);
      const cartProduct = {
        id,
        name,
        price,
        quantity,
        sold: product_info.sold,
        max: product_info?.quantity,
        createdBy: product_info?.createdBy,
      };
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  } else if (action.type === "REMOVE_FROM_CART") {
    const { id } = action.payload;
    console.log(`HERE IS THE ID : ${id}`);
    const newCart = state.cart.filter((product) => {
      return product.id != id;
    });

    return {
      ...state,
      cart: [...newCart],
    };
  } else if (action.type === "CART_ITEM_UPDATE") {
    const totalItemsInCart = state.cart.reduce((initialValue, product) => {
      initialValue = initialValue + product.quantity;
      return initialValue;
    }, 0);
    return {
      ...state,
      total_items: totalItemsInCart,
    };
  } else if (action.type === "TOTAL_AMOUNT_UPDATE") {
    const totalAmount = state.cart.reduce((initialAmount, product) => {
      initialAmount = initialAmount + product.price * product.quantity;
      return initialAmount;
    }, 0);
    console.log(`Total Amount is : ${totalAmount}`);
    return {
      ...state,
      total_amount: totalAmount,
    };
  } else if (action.type === "SET_INCREASE") {
    const updatedCart = state.cart.map((product) => {
      if (product.id === action.payload) {
        const newProduct = {
          ...product,
          quantity: product.quantity + 1,
        };
        return newProduct;
      } else return product;
    });
    return {
      ...state,
      cart: updatedCart,
    };
  } else if (action.type === "SET_DECREASE") {
    const updatedCart = state.cart.map((product) => {
      if (product.id === action.payload) {
        const newProduct = {
          ...product,
          quantity: product.quantity - 1,
        };
        return newProduct;
      } else return product;
    });
    return {
      ...state,
      cart: updatedCart,
    };
  } else if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};

export default CartReducer;
