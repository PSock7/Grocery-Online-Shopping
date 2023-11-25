const express = require("express");
const cors = require("cors");

const { products, appEvents } = require("./api");
const { logger, logEvents } = require("./api/middlewares/logger");
const errorHandler = require("./api/middlewares/errorHandler");
const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));
  app.use(errorHandler);
  app.use(logger);
  //api
  // appEvents(app);

  const channel = await CreateChannel();
  products(app, channel);

  // error handling
};
