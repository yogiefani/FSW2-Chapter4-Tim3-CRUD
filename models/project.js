'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      project.hasMany(models.tasks, {
        foreignKey: "projectId",
        as: "tasks",
      });
    }
  }
  project.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    startAt: DataTypes.DATE,
    endAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};