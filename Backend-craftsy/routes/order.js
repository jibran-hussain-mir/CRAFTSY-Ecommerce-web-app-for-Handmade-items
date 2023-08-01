const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controller/auth");
const {
  userById,
  addOrderToUserHistory,
  decreaseQuantityAndIncreaseSold,
  listOrders,
} = require("../controller/user");
const { createOrder } = require("../controller/order");
router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantityAndIncreaseSold,
  createOrder
);

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);

router.param("userId", userById);

module.exports = router;
