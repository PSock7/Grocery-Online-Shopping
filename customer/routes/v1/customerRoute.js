const express = require('express')
const router = express.Router()
const customerController = require('../../controllers/v1/customer')

const UserAuth = require("../../middleware/auth");
// Sign Up
router.post("/signup", customerController.signUp);

// Log In
router.post("/login", customerController.login);

// Add New Address
router.post("/:customerId/address", UserAuth, customerController.addAddress);

// Get Profile
router.get("/:customerId/profile", UserAuth, customerController.getProfile);

// Get Shopping Details
router.get("/:customerId/shopping-details", UserAuth, customerController.getShoppingDetails);

// Get Wishlist
router.get("/:customerId/wishlist", UserAuth, customerController.getWishlist);

module.exports = router;