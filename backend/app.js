require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/user", userRoute);
app.use("/uploads", express.static("uploads"));
app.use("/product", productRoute);

module.exports = app;
