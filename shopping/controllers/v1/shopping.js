const ShoppingService = require("../../service/shopping-service");
const UserService = require('../../../customer/service/customer-service');
const asyncHandler = require("express-async-handler");

class ShoppingController {
  constructor() {
    this.shoppingService = new ShoppingService();
    this.userService = new UserService();
  }

  placeOrder = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;

    try {
      const { data } = await this.shoppingService.PlaceOrder({ _id, txnNumber });
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  getOrders = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await this.userService.GetShopingDetails(_id);
      return res.status(200).json(data.orders);
    } catch (err) {
      next(err);
    }
  });

  getCart = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await this.userService.GetShopingDetails(_id);
      return res.status(200).json(data.cart);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = new ShoppingController();
