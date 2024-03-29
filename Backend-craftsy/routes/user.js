const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controller/auth");
const {
  userById,
  read,
  update,
  generateOTP,
  sendOTP,
} = require("../controller/user");

router.get("/generateOTP", generateOTP);
router.post("/sendOTP", sendOTP);

router.get("/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({ name: req.profile.name });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;
