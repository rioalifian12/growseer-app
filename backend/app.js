require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const roleRoute = require("./routes/roleRoute");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/role", roleRoute);

module.exports = app;
