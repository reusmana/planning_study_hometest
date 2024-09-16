"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlanStudy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlanStudy.belongsTo(models.Mahasiswa, {
        foreignKey: "mahasiswaId",
      });
      PlanStudy.belongsTo(models.CourseWork, {
        foreignKey: "courseworkId",
      });
    }
  }
  PlanStudy.init(
    {
      mahasiswaId: DataTypes.INTEGER,
      courseworkId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PlanStudy",
    }
  );
  return PlanStudy;
};
