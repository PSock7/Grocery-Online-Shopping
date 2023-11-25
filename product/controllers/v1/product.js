const ProductService = require("../../service/product-service");
const asyncHandler = require("express-async-handler");
const {
  PublishCustomerEvent,
  PublishShoppingEvent,
  PublishMessage,
} = require("../../utils");
const CUSTOMER_SERVICE = process.env.CUSTOMER_SERVICE;
const SHOPPING_SERVICE = process.env.SHOPPING_SERVICE;
class ProductController {
  constructor(channel) {
    this.service = new ProductService();
    this.channel = channel;
  }

  createProduct = asyncHandler(async (req, res, next) => {
    const { name, desc, type, unit, price, available, suplier, banner } =
      req.body;
    const { data } = await this.service.CreateProduct({
      name,
      desc,
      type,
      unit,
      price,
      available,
      suplier,
      banner,
    });
    res.json(data);
  });

  getProductsByCategory = asyncHandler(async (req, res, next) => {
    const type = req.params.type;

    try {
      const { data } = await this.service.GetProductsByCategory(type);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ error });
    }
  });

  getProductDescription = asyncHandler(async (req, res, next) => {
    const productId = req.params.id;

    try {
      const { data } = await this.service.GetProductDescription(productId);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ error });
    }
  });

  getSelectedProducts = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;
    const products = await this.service.GetSelectedProducts(ids);
    res.status(200).json(products);
  });

  addToWishlist = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { data } = await this.service.GetProductPayload(
      _id,
      { productId: req.body._id },
      "ADD_TO_WISHLIST"
    );

    this.channel.publish(CUSTOMER_SERVICE, JSON.stringify(data));

    res.status(200).json(data.data.product);
  });

  removeFromWishlist = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;

    const { data } = await this.service.GetProductPayload(
      _id,
      { productId },
      "REMOVE_FROM_WISHLIST"
    );

    this.channel.publish(CUSTOMER_SERVICE, JSON.stringify(data));

    res.status(200).json(data.data.product);
  });

  manageCart = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { data } = await this.service.GetProductPayload(
      _id,
      { productId: req.body._id, qty: req.body.qty },
      "ADD_TO_CART"
    );

    this.channel.publish(CUSTOMER_SERVICE, JSON.stringify(data));
    this.channel.publish(SHOPPING_SERVICE, JSON.stringify(data));

    const response = { product: data.data.product, unit: data.data.qty };

    res.status(200).json(response);
  });

  removeFromCart = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;

    const { data } = await this.service.GetProductPayload(
      _id,
      { productId },
      "REMOVE_FROM_CART"
    );

    this.channel.publish(CUSTOMER_SERVICE, JSON.stringify(data));
    this.channel.publish(SHOPPING_SERVICE, JSON.stringify(data));

    const response = { product: data.data.product, unit: data.data.qty };

    res.status(200).json(response);
  });

  whoAmI = (req, res, next) => {
    res.status(200).json({ msg: "/ or /products : I am products Service" });
  };

  getTopProducts = asyncHandler(async (req, res, next) => {
    try {
      const { data } = await this.service.GetProducts();
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ error });
    }
  });
}

module.exports = new ProductController();
