const express = require("express");
const { userById } = require("../controller/user");
const { isAdmin, isAuth, requireSignin } = require("../controller/auth");
const { generateToken, processPayment } = require("../controller/braintree");
const router = express.Router();

router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken);
router.post(
  "/braintree/payment/:userId",
  requireSignin,
  isAuth,
  processPayment
);
router.param("userId", userById);

module.exports = router;
