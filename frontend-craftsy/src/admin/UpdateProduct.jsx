import React, { useEffect, useState } from "react";
import { listProducts, deleteProduct } from "./adminapi";
import { isAuthenticated } from "../auth";

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const userId = isAuthenticated()?.user?._id;
  const token = isAuthenticated()?.token;

  const getProductsCreatedByAdmin = async () => {
    try {
      const data = await listProducts(userId, token);
      setProducts([...data]);
    } catch (e) {
      console.log(e);
    }
  };

  const destroyProduct = async (productId) => {
    try {
      const data = await deleteProduct(productId, userId, token);
      getProductsCreatedByAdmin();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProductsCreatedByAdmin();
  }, []);

  return <>{JSON.stringify(products)}</>;
};

export default UpdateProduct;
