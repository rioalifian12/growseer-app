const { UserDetail } = require("../models");
const { User } = require("../models");
const { validate: isUUID } = require("uuid");
require("dotenv").config();

// Get All User Details
const getUserDetails = async (req, res) => {
  try {
    const userDetails = await User.findAll({
      where: { role: "customer" },
      include: {
        model: UserDetail,
        as: "detail",
      },
      attributes: ["id"],
    });

    res.status(200).json({ userDetails });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Get User by ID
const getUserDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id, 4)) {
      return res.status(400).json({ message: "Invalid UUID format" });
    }
    const userDetail = await UserDetail.findByPk(id);
    if (!userDetail) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(userDetail);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Add User Detail
const createUserDetail = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const { id } = req.user;

    const userDetail = await UserDetail.create({
      userId: id,
      name,
      phone,
      address,
    });
    res.status(201).json({
      message: "Create user detail successfully!",
      userDetail,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Update User Detail
const updateUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address } = req.body;
    const userDetail = await UserDetail.findByPk(id);
    if (!userDetail) return res.status(404).json({ message: "User not found" });

    userDetail.name = name || userDetail.name;
    userDetail.phone = phone || userDetail.phone;
    userDetail.address = address || userDetail.address;

    await UserDetail.save();
    res.status(201).json({
      message: "Update user detail successfully",
      userDetail,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

// Delete User
const deleteUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetail = await UserDetail.findByPk(id);
    if (!userDetail) {
      return res.status(404).json({ message: "User not found" });
    }

    await UserDetail.destroy();
    res.json({ message: "Delete user detail successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = {
  getUserDetails,
  getUserDetailById,
  createUserDetail,
  updateUserDetail,
  deleteUserDetail,
};
