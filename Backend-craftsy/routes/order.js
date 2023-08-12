const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controller/auth");
const {
  userById,
  addOrderToUserHistory,
  decreaseQuantityAndIncreaseSold,
  listOrders,
} = require("../controller/user");
const {
  createOrder,
  getStatusValues,
  orderById,
  updateOrderStatus,
  getOrderStatus,
} = require("../controller/order");
router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantityAndIncreaseSold,
  createOrder
);

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);
router.get(
  "/order/status-values/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
);
router.put(
  "/order/:orderId/status/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
);
router.get("/:orderId/status", requireSignin, isAuth, isAdmin, getOrderStatus);
router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
