const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const colors = require("colors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/customer", proxy("http://localhost:3501"));
app.use("/shopping", proxy("http://localhost:3502"));
app.use("/", proxy("http://localhost:3500")); // products

app.listen(8000, () => {
  console.log(colors.bgMagenta("Gateway is Listening to Port 8000"));
});
