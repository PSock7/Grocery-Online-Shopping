const express = require("express");
const router = express.Router();
const customerController = require("../../controllers/v1/customer");

const UserAuth = require("../../middleware/auth");

router.post("/signup", customerController.signUp);
router.post("/login", customerController.login);
router.post("/address", UserAuth, customerController.addAddress);
router.get("/profile", UserAuth, customerController.getProfile);
router.get(
  "/shopping-details",
  UserAuth,
  customerController.getShoppingDetails
);
router.get("/wishlist", UserAuth, customerController.getWishlist);

module.exports = router;
