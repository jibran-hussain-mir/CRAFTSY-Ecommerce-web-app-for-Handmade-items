import React, { useState, useEffect } from "react";
import { listOrders, getOrderStatus } from "../adminapi";
import { isAuthenticated } from "../../auth";
import "./css/CustomerOrders.css";
import DropDown from "./DropdownForTable/DropDown";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(true);

  const handleStatus = () => {
    console.log("hello");
    setStatus(!status);
  };
  console.log(status);

  const userId = isAuthenticated()?.user?._id;
  const token = isAuthenticated()?.token;

  const listAllOrders = async () => {
    try {
      const data = await listOrders(userId, token);
      console.log(data);
      if (data.error) {
        console.log(`error is in api of Order.jsx page`);
        setError(data.error);
      } else {
        setOrders(data);
      }
    } catch (err) {
      console.log(err);
      console.log("The error is in order.jsx page");
    }
  };

  const getStatus = async () => {
    try {
      const status = getOrderStatus(userId, token);
      setStatus(status);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    listAllOrders();
  }, [status]);
  console.log(orders);

  return (
    <div className="middle">
      <div className="table-container">
        <h1 className="tabletophead">Admin User Orders</h1>
        <table className="tablex">
          <thead>
            <th>Order Id</th>
            <th>Ordered By</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Transaction Id</th>
            <th>Address</th>
            <th>Status</th>
            <th> Update Status</th>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="order-id" data-label={"Order Id"}>
                  {order.orderId} {/* Corrected this line */}
                </td>
                <td data-label={"Ordered By"}>{order.userName}</td>
                <td data-label={"Product Name"}>{order.name}</td>
                <td data-label={"Quantity"}>{order.quantity}</td>
                <td data-label={"Total Amount"}>{order.amount}</td>
                <td data-label={"Transaction Id"}>{order.transaction_id}</td>
                <td data-label={"Address"}>{order.address}</td>
                <td data-label={"Status"}>{order.status}</td>
                <td data-label={" Update Status"}>
                  <DropDown
                    orderId={order.orderId}
                    productId={order.productId}
                    refresh={handleStatus}
                    customerEmail={order.userEmail}
                  />
                </td>
                {console.log(orders)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1>{error}</h1>
    </div>
  );
};

export default Order;
