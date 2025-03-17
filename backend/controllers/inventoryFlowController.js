const { InventoryFlow } = require("../models");

const getInventoryFlow = async (req, res) => {
  try {
    const flows = await InventoryFlow.findAll();
    res.status(200).json(flows);
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
    const flow = await InventoryFlow.findByPk(id);
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
