"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  });

  Role.associate = (models) => {
    Role.hasMany(models.User, { foreignKey: "role_id", as: "users" });
  };

  return Role;
};
