const productController = require("../../controllers/v1/product");
const UserAuth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/create", productController.createProduct);
router.get("/category/:type", productController.getProductsByCategory);
router.get("/:id", productController.getProductDescription);
router.post("/ids", productController.getSelectedProducts);
router.put("/wishlist", UserAuth, productController.addToWishlist);
router.delete("/wishlist/:id", UserAuth, productController.removeFromWishlist);
router.put("/cart", UserAuth, productController.manageCart);
router.delete("/cart/:id", UserAuth, productController.removeFromCart);
router.get("/whoami", productController.whoAmI);
router.get("/", productController.getTopProducts);

module.exports = router;
