'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tasks.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      });
      tasks.belongsTo(models.project, {
        foreignKey: "projectId",
        as: "project",
      });
    }
  }
  tasks.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tasks',
  });
  return tasks;
};