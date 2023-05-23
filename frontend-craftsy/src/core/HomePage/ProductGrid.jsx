import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const ProductGrid = () => {
  const [data, setData] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/products?limit=20"
      );
      console.log(response);
      const { products } = response.data;
      setData(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1, xl: 3 }}
      >
        {data.map((product) => {
          return (
            <Grid item key={product._id}>
              <ProductCard
                name={product.name}
                description={product.description.slice(0, 60) + "..."}
                productId={product._id}
                price={product.price}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ProductGrid;
