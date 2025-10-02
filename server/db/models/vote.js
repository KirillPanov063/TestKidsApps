"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vote.belongsTo(models.Idea, {
        foreignKey: "idea_id",
        as: "idea",
      });
    }
  }
  Vote.init(
    {
      idea_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Ideas",
          key: "id",
        },
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Vote",
      tableName: "Votes",
    }
  );
  return Vote;
};
