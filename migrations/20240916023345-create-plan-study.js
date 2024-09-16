"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PlanStudies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mahasiswaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Mahasiswas",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      courseworkId: {
        type: Sequelize.INTEGER,
        references: {
          model: "CourseWorks",
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("PlanStudies");
  },
};
