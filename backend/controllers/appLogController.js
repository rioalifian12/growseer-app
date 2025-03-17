const { AppLog } = require("../models");

const getAppLog = async (req, res) => {
  try {
    const logs = await AppLog.findAll();
    if (!logs) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};
const getAppLogById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id, 4)) {
      return res.status(400).json({ message: "Invalid UUID format" });
    }

    const log = await AppLog.findByPk(id);
    if (!log) {
      return res.status(404).json({ message: "Log not found!" });
    }
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = {
  getAppLog,
  getAppLogById,
};
