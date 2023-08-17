const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  photo,
  listProducts,
  listBySearch,
} = require("../controller/product");
const { isAdmin, isAuth, requireSignin } = require("../controller/auth");
const { userById, purchaseHistory } = require("../controller/user");

router.get("/products", list); //It breaks when i switch it to get
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/product/:productId", read);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.get("/product/photo/:productId", photo);
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);
router.get(
  "/list-products/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  listProducts
);
router.post("/products/by/search", listBySearch);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
