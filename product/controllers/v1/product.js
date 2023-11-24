const ProductService = require("../../service/product-service");
const CustomerService = require("../../../customer/service/customer-service");
const UserAuth = require("../../middleware/auth");
const asyncHandler = require("express-async-handler");

class ProductController {
  constructor() {
    this.productService = new ProductService();
    this.customerService = new CustomerService();
  }

  createProduct = asyncHandler(async (req, res, next) => {
    try {
      const { name, desc, type, unit, price, available, suplier, banner } = req.body;
      const { data } = await this.productService.CreateProduct({
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
        banner,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  getProductsByCategory = asyncHandler(async (req, res, next) => {
    const type = req.params.type;
    try {
      const { data } = await this.productService.GetProductsByCategory(type);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  getProductDescription = asyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    try {
      const { data } = await this.productService.GetProductDescription(productId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  getSelectedProducts = asyncHandler(async (req, res, next) => {
    try {
      const { ids } = req.body;
      const products = await this.productService.GetSelectedProducts(ids);
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  });

  addToWishlist = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    try {
      const product = await this.productService.GetProductById(req.body._id);
      const wishList = await this.customerService.AddToWishlist(_id, product);
      return res.status(200).json(wishList);
    } catch (err) {
      next(err);
    }
  });

  removeFromWishlist = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;
    try {
      const product = await this.productService.GetProductById(productId);
      const wishlist = await this.customerService.AddToWishlist(_id, product);
      return res.status(200).json(wishlist);
    } catch (err) {
      next(err);
    }
  });

  manageCart = asyncHandler(async (req, res, next) => {
    const { _id, qty } = req.body;
    try {
      const product = await this.productService.GetProductById(_id);
      const result = await this.customerService.ManageCart(req.user._id, product, qty, false);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  removeFromCart = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    try {
      const product = await this.productService.GetProductById(req.params.id);
      const result = await this.customerService.ManageCart(_id, product, 0, true);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  getTopProductsAndCategory = asyncHandler(async (req, res, next) => {
    try {
      const { data } = await this.productService.GetProducts();
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = new ProductController();
