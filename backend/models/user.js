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
      // define association here
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
      name: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING(40), allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM("superadmin", "inventory", "sales", "customer"),
        allowNull: false,
        defaultValue: "customer",
      },
      phone: { type: DataTypes.STRING(14), allowNull: false },
      address: { type: DataTypes.TEXT, allowNull: true },
      sessionExpiresAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
