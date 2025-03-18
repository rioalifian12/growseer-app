const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { UserDetail } = require("../models");
const { validate: isUUID } = require("uuid");
require("dotenv").config();

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    if (!users) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id, 4)) {
      return res.status(400).json({ message: "Invalid UUID format" });
    }
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Register User
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Register user successfully!",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne(
      { where: { email } },
      { attributes: { exclude: ["password"] } }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "8h" }
    );

    // Update session expiry time 8hour
    user.sessionExpiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);
    await user.save();
    res.status(200).json({
      message: "Login successfully!",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// lgout user
const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log(decoded.id);

    await User.update(
      { sessionExpiresAt: new Date() },
      { where: { id: decoded.id } }
    );
    res.status(200).json({ message: "Logout successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // role boleh diubah hanya oleh superadmin
    const { checkRole } = req.user;
    if (checkRole === "superadmin") {
      user.role = role || user.role;
    }

    await user.save();
    res.status(201).json({
      message: "Update user successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Update passwordd
const updatePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Passwords do not match!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ message: "Update password successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.json({ message: "Delete user successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  register,
  login,
  logout,
  updateUser,
  updatePassword,
  deleteUser,
};
