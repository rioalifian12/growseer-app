require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const userRoute = require("./routes/userRoute");
const userDetailRoute = require("./routes/userDetailRoute");
const productRoute = require("./routes/productRoute");
const inventoryFlowRoute = require("./routes/inventoryFlowRoute");
const appLogRoute = require("./routes/appLogRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use("/user", userRoute);
app.use("/user-detail", userDetailRoute);
app.use("/uploads", express.static("uploads"));
app.use("/product", productRoute);
app.use("/flow", inventoryFlowRoute);
app.use("/log", appLogRoute);

module.exports = app;
