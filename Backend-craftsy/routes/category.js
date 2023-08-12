const express = require("express");
const router = express.Router();
const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
  photo,
} = require("../controller/category");
const { isAdmin, isAuth, requireSignin } = require("../controller/auth");
const { userById } = require("../controller/user");

router.get("/categories", list);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/category/:categoryId", read);
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get("/category/photo/:categoryId", photo);
router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
