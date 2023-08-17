import React, { useState, useEffect } from "react";
import "./css/PurchasedProducts.css";
import { isAuthenticated } from "../../auth";
import { getPurchaseHistory } from "../apiUser";
import moment from "moment";

function PurchasedProducts() {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const userId = isAuthenticated()?.user?._id;
  const token = isAuthenticated()?.token;

  const [orders, setOrders] = useState([]);
  const getOrderList = async () => {
    try {
      const data = await getPurchaseHistory(userId, token);
      setOrders([...data]);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getOrderList();
  }, []);
  return (
    <>
      <div className="table-container">
        <table className="tablex">
          <thead>
            <th>Order ID</th>
            <th>Product Name</th>

            <th>Price</th>
            <th>Quantity</th>
            <th>Purchase Date</th>
            <th>Address</th>
            <th>Status</th>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return order.products.map((h, i) => (
                <tr key={i}>
                  <td className="order-id" data-label={"Order ID"}>
                    {order._id}
                  </td>
                  <td data-label={"Product Name"}>{h.name}</td>

                  <td data-label={"Price"}>{h.price}</td>
                  <td data-label={"Quantity"}>{h.quantity}</td>
                  <td data-label={"Purchase Date"}>
                    {moment(h.createdAt).fromNow()}
                  </td>
                  <td data-label={"Address"}>{order.address}</td>

                  <td data-label={"Status"}>{h.status}</td>

                  {console.log(h)}
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PurchasedProducts;
