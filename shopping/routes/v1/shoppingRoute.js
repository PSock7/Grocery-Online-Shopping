const express = require("express");
const shoppingController = require("../../controllers/v1/shopping");
const UserAuth = require("../../middleware/auth");

const router = express.Router();

// Place an order
router.post("/order", UserAuth, shoppingController.placeOrder);

// Get user's orders
router.get("/orders", UserAuth, shoppingController.getOrders);

// Get user's shopping cart
router.get("/cart", UserAuth, shoppingController.getCart);

module.exports = router;
