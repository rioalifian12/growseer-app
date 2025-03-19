"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserDetail, { foreignKey: "userId", as: "detail" });
      User.hasMany(models.AppLog, { foreignKey: "userId", as: "logs" });
      User.hasMany(models.Order, { foreignKey: "userId", as: "order" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: { type: DataTypes.STRING(40), allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM("superadmin", "inventory", "sales", "customer"),
        allowNull: false,
        defaultValue: "customer",
      },
      sessionExpiresAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
