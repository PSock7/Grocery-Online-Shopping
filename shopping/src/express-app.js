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
  app.use("/", express.static(path.join(__dirname, "public")));
  app.use(errorHandler);
  app.use(logger);
  app.use("/", require("./routes/root"));

  app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ message: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  });

  //api
  // appEvents(app);

  const channel = await CreateChannel();

  shopping(app, channel);
  // error handling
};
