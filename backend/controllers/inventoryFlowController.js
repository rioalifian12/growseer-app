const { InventoryFlow } = require("../models");
const { validate: isUUID } = require("uuid");

const getInventoryFlow = async (req, res) => {
  try {
    const flows = await InventoryFlow.findAll();
    res.status(200).json(flows);
    if (!flows) {
      return res.status(404).json({ message: "Inventory flow not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};
const getInventoryFlowById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id, 4)) {
      return res.status(400).json({ message: "Invalid UUID format" });
    }

    const flow = await InventoryFlow.findByPk(id);
    if (!flow) {
      return res.status(404).json({ message: "Inventory flow not found!" });
    }
    res.status(200).json(flow);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = {
  getInventoryFlow,
  getInventoryFlowById,
};
