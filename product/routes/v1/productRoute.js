const productController = require("../../controllers/v1/product");
const UserAuth = require("../../middleware/auth");
const express = require('express')
const router = express.Router()
// Create a new product
router.post("/create", productController.createProduct);

// Get products by category
router.get("/category/:type", productController.getProductsByCategory);

// Get product description by ID
router.get("/:id", productController.getProductDescription);

// Get selected products by IDs
router.post("/ids", productController.getSelectedProducts);

// Add to wishlist
router.put("/wishlist", UserAuth, productController.addToWishlist);

// Remove from wishlist
router.delete("/wishlist/:id", UserAuth, productController.removeFromWishlist);

// Manage cart (add or remove)
router.put("/cart", UserAuth, productController.manageCart);

// Remove from cart
router.delete("/cart/:id", UserAuth, productController.removeFromCart);

// Get top products and category
router.get("/", productController.getTopProductsAndCategory);

module.exports = router;