const express = require("express");
const cors = require("cors");
const path = require("path");
const { shopping, appEvents } = require("./api");
const { CreateChannel } = require("./utils");
const { logger, logEvents } = require("./api/middlewares/logger");
const errorHandler = require("./api/middlewares/errorHandler");
module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  app.use(errorHandler);
  app.use(logger);

  //api
  // appEvents(app);

  const channel = await CreateChannel();

  shopping(app, channel);
  // error handling
};
