const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const colors = require("colors");
const app = express();
const baseUrl="http://localhost"

app.use(cors());
app.use(express.json());

//app.use("/customer", proxy(`${baseUrl}:3501`)) //http://192.168.49.2:31280
//app.use("/shopping", proxy(`${baseUrl}:3502`))
//app.use("/customer", proxy(`${baseUrl}:3500`))

app.use("/customer", proxy("http://192.168.49.2:31280"));
app.use("/shopping", proxy("http://192.168.49.2:31281"));
app.use("/", proxy(" http://192.168.49.2:31282"));

app.listen(8000, () => {
  console.log(colors.bgMagenta("Gateway is Listening to Port 8000"));
});
