const { Role } = require("../models");

const getAllRole = async (req, res) => {
  try {
    const roles = await Role.findAll();
    if (!roles) {
      return res.status(404).json({ message: "Role not found!" });
    }
    res.status(200).json({ data: roles });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found!" });
    }
    res.status(200).json({ data: role });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.create({
      name,
    });
    res.status(201).json({
      message: "Create role successfully!",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Role.update({ name }, { where: { id } });
    res.status(200).json({
      message: "Edit role successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found!" });
    }
    await Role.destroy({ where: { id } });
    res.status(200).json({ message: "Delete role successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = {
  getAllRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
