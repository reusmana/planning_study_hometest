"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CourseWork.belongsToMany(models.Mahasiswa, {
        through: "PlanStudy",
        foreignKey: "courseworkId",
      });
    }
  }
  // CourseWork.associate = (models) => {
  //   CourseWork.belongsToMany(models.Mahasiswa, {
  //     through: "PlanStudy",
  //     foreignKey: "courseworkId",
  //   });
  // };

  CourseWork.init(
    {
      name: DataTypes.STRING,
      kode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CourseWork",
    }
  );
  return CourseWork;
};
