const CustomerService = require("../../service/customer-service");
const asyncHandler = require("express-async-handler");


class CustomerController {
  constructor() {
    this.service = new CustomerService();
  }

  signUp = asyncHandler(async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const { data } = await this.service.SignUp({ email, password, phone });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  login = asyncHandler(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data } = await this.service.SignIn({ email, password });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  addAddress = asyncHandler(async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const { street, postalCode, city, country } = req.body;
      const { data } = await this.service.AddNewAddress(customerId, {
        street,
        postalCode,
        city,
        country,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  getProfile = asyncHandler(async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const { data } = await this.service.GetProfile({ _id: customerId });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  getShoppingDetails = asyncHandler(async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const { data } = await this.service.GetShopingDetails(customerId);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  getWishlist = asyncHandler(async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const { data } = await this.service.GetWishList(customerId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = new CustomerController();

