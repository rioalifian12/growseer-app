"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "orderId",
        as: "order",
      });
      OrderDetail.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  OrderDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
