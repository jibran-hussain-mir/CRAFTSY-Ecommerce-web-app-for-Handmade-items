const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controller/auth");
const {
  userById,
  addOrderToUserHistory,
  decreaseQuantityAndIncreaseSold,
} = require("../controller/user");
const { createOrder } = require("../controller/order");
router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  // decreaseQuantityAndIncreaseSold,
  createOrder
);

router.param("userId", userById);

module.exports = router;
