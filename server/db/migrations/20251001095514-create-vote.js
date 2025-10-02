"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Votes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idea_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Ideas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });

    await queryInterface.addIndex("Votes", ["ip_address"]);

    await queryInterface.addIndex("Votes", ["idea_id", "ip_address"], {
      unique: true,
      name: "unique_vote_per_idea_ip",
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Votes");
  },
};
