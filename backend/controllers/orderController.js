const { Order, OrderDetail, Product, UserDetail } = require("../models");
const { validate: isUUID } = require("uuid");

const createOrder = async (req, res) => {
  try {
    const { orderDetail } = req.body;
    const userId = req.user.id;

    const userDetail = await UserDetail.findOne({ where: { userId: userId } });
    if (!userDetail) {
      return res.status(400).json({
        message: "Before making an order, fill in the user details first",
      });
    }

    if (!Array.isArray(orderDetail) || orderDetail.length === 0) {
      return res
        .status(400)
        .json({ message: "Order details must be a json array" });
    }

    let totalAmount = 0;
    let orderItems = [];

    for (const item of orderDetail) {
      const { productId, quantity, unitType } = item;

      if (!Product || !quantity || !unitType) {
        return res.status(400).json({
          message: "Item must have a productId, quantity, and unitType.",
        });
      }

      if (!isUUID(productId, 4)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      let unitPrice = 0;
      let isStockEnough = false;
      if (unitType === "carton") {
        unitPrice = product.pricePerCarton;
        if (product.stockCarton >= quantity) {
          isStockEnough = true;
          product.stockCarton -= quantity;
        }
      } else if (unitType === "box") {
        unitPrice = product.pricePerBox;
        const totalBoxAvailable = product.stockCarton * product.boxPerCarton;
        if (totalBoxAvailable >= quantity) {
          isStockEnough = true;

          let remainingBoxes = quantity;
          while (remainingBoxes > 0 && product.stockCarton > 0) {
            if (remainingBoxes >= product.boxPerCarton) {
              product.stockCarton -= Math.ceil(quantity / product.boxPerCarton);
              remainingBoxes -= product.boxPerCarton;
            } else {
              remainingBoxes = 0;
            }
          }
        }
      } else {
        return res
          .status(400)
          .json({ message: "unitType must be carton or box" });
      }

      if (!isStockEnough) {
        return res
          .status(400)
          .json({ message: `Stock not enough for ${product.name}` });
      }

      const subTotal = quantity * unitPrice;
      totalAmount += subTotal;

      orderItems.push({
        productId,
        quantity,
        unitType,
        subTotal,
      });
      await product.save();
    }

    const order = await Order.create({
      userId,
      totalAmount,
      status: "processing",
    });

    await OrderDetail.bulkCreate(
      orderItems.map((item) => ({
        ...item,
        orderId: order.id,
      }))
    );

    return res.status(201).json({ order, orderDetail: orderItems });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();

    if (!orders) {
      return res.status(404).json({ message: "Order not found!" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const getOrdersById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderDetail,
          as: "orderDetails",
          attributes: ["productId", "quantity", "unitType", "subTotal"],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatus = ["processing", "shipped", "completed", "canceled"];
    if (status && !validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status || order.status;
    console.log(order.status);

    await order.save();
    res.status(201).json({
      message: "Update order detail successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrdersById,
  updateOrder,
};
