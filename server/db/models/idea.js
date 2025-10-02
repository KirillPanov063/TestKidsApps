"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Idea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Idea.hasMany(models.Vote, {
        foreignKey: "idea_id",
        as: "votes",
      });
    }
  }
  Idea.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Idea",
      tableName: "Ideas",
    }
  );
  return Idea;
};
