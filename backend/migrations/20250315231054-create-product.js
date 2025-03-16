"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      pricePerCarton: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      pricePerBox: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      stockCarton: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      boxPerCarton: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unitType: {
        type: Sequelize.ENUM("carton", "box"),
        allowNull: false,
        defaultValue: "carton",
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      imageUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
