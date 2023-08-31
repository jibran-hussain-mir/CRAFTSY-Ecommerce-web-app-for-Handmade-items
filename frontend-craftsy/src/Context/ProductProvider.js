import React, { useEffect } from "react";
import { createContext, useReducer } from "react";
import axios from "axios";
import reducer from "../Reducer/SingleProductReducer.js";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const initialState = {
    isSingleLoading: false,
    singleProduct: [],
    isError: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getSingleProduct = async (productId) => {
    console.log(`i am working with id = ${productId}`);
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const singleProduct = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/${productId}`
      );
      const data = await singleProduct.data;
      console.log(data);
      // console.log(`here is the ${JSON.stringify(data)}`);
      console.log("hi");
      dispatch({ type: "SINGLE_PRODUCT_API_DATA", payload: data });
    } catch (error) {
      dispatch({ type: "SINGLE_PRODUCT_ERROR", payload: error });
    }
  };

  // useEffect(() => {

  // }, []);

  return (
    <ProductContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
