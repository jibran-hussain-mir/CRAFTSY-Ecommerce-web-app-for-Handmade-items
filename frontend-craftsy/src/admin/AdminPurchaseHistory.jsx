import React, { useEffect, useState } from "react";
import "./css/AdminPurchaseHistory.css";
import { isAuthenticated } from "../auth";
import { getPurchaseHistory } from "../user/apiUser";
import moment from "moment";

const AdminPurchaseHistory = () => {
  const [history, setHistory] = useState([]);
  const userId = isAuthenticated()?.user?._id;
  const token = isAuthenticated()?.token;
  const init = async () => {
    try {
      const history = await getPurchaseHistory(userId, token);
      setHistory([...history]);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="middle">
      <div className="table-container">
        <h1 className="everyheading">Purchase History</h1>
        <table className="tablex">
          <thead>
            <tr>
              {" "}
              {/* Corrected this line */}
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Purchase Date</th>
            </tr>{" "}
            {/* Corrected this line */}
          </thead>
          <tbody>
            {history.map((order, index) => {
              return order.products.map((h, i) => (
                <tr key={i}>
                  <td className="order-id" data-label={"Product Name"}>
                    {h.name}
                  </td>
                  <td data-label={"Price"}>{h.price}</td>
                  <td data-label={"Quantity"}>{h.quantity}</td>
                  <td data-label={"Purchase Date"}>
                    {moment(h.createdAt).fromNow()}
                  </td>
                  {console.log(h)}
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPurchaseHistory;
