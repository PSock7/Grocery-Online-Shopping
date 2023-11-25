const CustomerService = require("../../service/customer-service");
const asyncHandler = require("express-async-handler");

class CustomerController {
  constructor() {
    this.service = new CustomerService();
  }

  signUp = asyncHandler(async (req, res, next) => {
    const { email, password, phone } = req.body;
    const { data } = await this.service.SignUp({ email, password, phone });
    res.json(data);
  });

  login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const { data } = await this.service.SignIn({ email, password });
    res.json(data);
  });

  addAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { street, postalCode, city, country } = req.body;
    const { data } = await this.service.AddNewAddress(_id, { street, postalCode, city, country });
    res.json(data);
  });

  getProfile = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { data } = await this.service.GetProfile({ _id });
    res.json(data);
  });

  getShoppingDetails = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { data } = await this.service.GetShopingDetails(_id);
    res.json(data);
  });

  getWishlist = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { data } = await this.service.GetWishList(_id);
    res.status(200).json(data);
  });
}

module.exports = new CustomerController();