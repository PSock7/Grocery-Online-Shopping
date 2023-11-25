const ProductService = require("../service/product-service");
const asyncHandler = require("express-async-handler");

class EventController {
  constructor() {
    this.service = new ProductService();
  }

  subscribeEvents = asyncHandler(async (req, res, next) => {
    const { payload } = req.body;

    // Handle subscribe events
    this.service.SubscribeEvents(payload);

    console.log("============= Shopping ================");
    console.log(payload);
    res.json(payload);
  });
}

module.exports = new EventController();
