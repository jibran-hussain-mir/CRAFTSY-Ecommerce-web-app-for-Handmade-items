const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  sellerSignup,
  resetPasswordPost,
  resetPassword,
} = require("../controller/auth");
const { userSignupValidator, validateResults } = require("../Validator/index");

router.post("/signup", userSignupValidator, validateResults, signup);
router.post(
  "/seller-signup",
  userSignupValidator,
  validateResults,
  sellerSignup
);
router.post("/signin", signin);
router.post("/reset-password", resetPasswordPost);
router.post("/reset-password/:id/:token", resetPassword);
router.get("/signout", signout);

module.exports = router;
