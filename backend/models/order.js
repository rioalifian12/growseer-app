"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Product, {
        foreignKey: "userId",
        as: "user",
      });
      Order.hasMany(models.DetailOrder, {
        foreignKey: "orderId",
        as: "orderDetail",
      });
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("processing", "shipped", "completed"),
        allowNull: false,
        defaultValue: "processing",
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
