import React, { useState } from "react";
import Header from "./Header";
import { getProducts } from "./apiCore";

function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState("");

  const getProductsBySell = async () => {
    const data = await getProducts("sold");
    if (data.error) {
      setError(data.error);
    } else {
      setProductsBySell(data);
    }
  };

  const getProductsByArrival = async () => {
    const data = await getProducts("timestamp");
    if (data.error) {
      setError(data.error);
    } else {
      setProductsByArrival(data);
    }
  };

  return (
    <>
      <Header />
      <button onClick={getProductsByArrival}>Click Here</button>
      {JSON.stringify(productsByArrival)}
    </>
  );
}

export default Home;
