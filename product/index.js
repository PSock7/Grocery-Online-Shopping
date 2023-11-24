const express = require('express')
const mongoose = require("mongoose");
const app = express()
const path = require('path')
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500
const colors = require("colors");
const { databaseConnection } = require('./database');
const productRoute = require("./routes/v1/productRoute");

console.log("You are on:", colors.blue(process.env.NODE_ENV));

databaseConnection();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/product", productRoute);

app.use("/", express.static(path.join(__dirname, "public")));

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

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, "localhost", () =>
      console.log(colors.cyan(`Server running on http://localhost:${PORT}`))
    );
  });
  
  mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongoErrLog.log"
    );
  });