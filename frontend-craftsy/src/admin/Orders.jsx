import React, { useState, useEffect } from "react";
import { listOrders } from "../admin/adminapi";
import { isAuthenticated } from "../auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

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
  useEffect(() => {
    listAllOrders();
  }, []);
  return (
    <>
      <h1>Orders Page</h1>

      <h1>{error}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="right">Ordered By</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Toatal Amount</TableCell>
              <TableCell align="right">Transaction ID</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={orders._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.orderId}
                </TableCell>
                <TableCell>{order.userName}</TableCell>

                <TableCell align="right">{order.name}</TableCell>
                <TableCell align="right">{order.quantity}</TableCell>
                <TableCell align="right">{order.amount}</TableCell>
                <TableCell align="right">{order.transaction_id}</TableCell>
                <TableCell align="right">{order.address}</TableCell>
                <TableCell align="right">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Order;
