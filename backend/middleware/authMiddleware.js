const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const verified = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ where: { id: verified.id } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.sessionExpiresAt && new Date(user.sessionExpiresAt) < new Date()) {
      return res.status(401).json({
        message: "Session expired, please login again",
      });
    }
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = {
  authUser,
};
