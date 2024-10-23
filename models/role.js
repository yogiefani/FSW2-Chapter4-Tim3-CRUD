"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association to User model
      role.hasMany(models.user, { foreignKey: "roleId" });
    }
   
  }
  role.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "role",
    }
  );
  return role;
};
