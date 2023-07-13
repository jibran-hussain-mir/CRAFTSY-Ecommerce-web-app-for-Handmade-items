import React, { useContext, useEffect, useState } from "react";
import { getClientToken, processPayment, createOrder } from "./apiCore";
import { isAuthenticated } from "../auth";
import DropIn from "braintree-web-drop-in-react";
import { CartContext } from "../Context/CartProvider";

const Checkout = () => {
  const [data, setData] = useState({
    success: "",
    error: "",
    clientToken: null,
    instance: {},
    address: "",
  });

  const { cart, clearCart, total_amount } = useContext(CartContext);

  const userId = isAuthenticated()?.user?._id;
  const token = isAuthenticated()?.token;

  const buy = async () => {
    try {
      const nonce = await data.instance.requestPaymentMethod();
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: total_amount,
      };

      console.log(nonce);

      const response = await processPayment(userId, token, paymentData);
      createOrder(userId, token, cart);
      clearCart();
      console.log(`The transaction id : ${response}.  `);
      return response;
    } catch (e) {
      console.log(e);
      setData({ ...data, error: e });
    }
  };
  const { total_items } = useContext(CartContext);

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <button>Sign in</button>
    );
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && total_items > 0 ? (
        <>
          <h2>Checkout Page</h2>
          {showError()}
          <DropIn
            options={{ authorization: data.clientToken }}
            onInstance={(instance) => {
              setData({ ...data, instance });
            }}
          />
          <button
            onClick={buy}
            style={{
              border: "none",
              backgroundColor: "#5cb85c",
              color: "white",
              height: "3.5rem",
              width: "100%",
              fontSize: "1.5rem",
            }}
          >
            Pay Now
          </button>
        </>
      ) : null}
    </div>
  );

  const clientToken = async () => {
    try {
      const response = await getClientToken(userId, token);
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ ...data, clientToken: response.clientToken });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const showError = () => (
    <div
      style={{
        display: data.error ? "" : "none",
        height: "20px",
        width: "250px",
        backgroundColor: "orangered",
      }}
    >
      <h3>{data.error.message}</h3>
    </div>
  );

  useEffect(() => {
    clientToken();
  }, []);

  return (
    <div>
      {showCheckout()}
      {JSON.stringify(data.error)}
    </div>
  );
};

export default Checkout;
