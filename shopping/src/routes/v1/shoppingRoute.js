const express = require("express");
const shoppingController = require("../../controllers/v1/shopping");
const UserAuth = require("../../middleware/auth");

const router = express.Router();

router.post("/order", UserAuth, shoppingController.placeOrder);
router.get("/orders", UserAuth, shoppingController.getOrders);
router.put("/cart", UserAuth, shoppingController.addToCart);
router.delete("/cart/:id", UserAuth, shoppingController.removeFromCart);
router.get("/cart", UserAuth, shoppingController.getCart);
router.get("/whoami", shoppingController.whoAmI);

module.exports = router;
