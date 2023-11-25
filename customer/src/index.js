const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const { CreateChannel } = require("./utils");
const colors = require("colors");
const StartServer = async () => {
  const app = express();

  await databaseConnection();

  const channel = await CreateChannel();

  await expressApp(app, channel);

  app
    .listen(PORT, () => {
      console.log(colors.blue(`listening to port ${PORT}`));
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    })
    .on("close", () => {
      channel.close();
    });
};

StartServer();
