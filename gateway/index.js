const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const proxy=require("express-http-proxy")
const colors = require("colors");
const PORT = 5000


app.use(express.json())

app.use(cookieParser())

app.use("/customer",proxy("http://localhost:3501" ))
app.use('/', proxy("http://localhost:3500" )) 
app.use("/shopping",proxy("http://localhost:3502" ))


app.listen(PORT, "localhost", () =>
console.log(colors.cyan(`Gateway running on http://localhost:${PORT}`))
);