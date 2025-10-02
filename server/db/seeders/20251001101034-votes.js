"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Добавляем 20 тестовых голосов
    await queryInterface.bulkInsert(
      "Votes",
      [
        
        {
          idea_id: 1,
          ip_address: "192.168.1.100",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idea_id: 1,
          ip_address: "192.168.1.101",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idea_id: 1,
          ip_address: "192.168.1.102",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          idea_id: 2,
          ip_address: "192.168.1.100",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idea_id: 2,
          ip_address: "192.168.1.103",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idea_id: 2,
          ip_address: "192.168.1.104",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          idea_id: 3,
          ip_address: "192.168.1.101",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idea_id: 3,
          ip_address: "192.168.1.105",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          idea_id: 4,
          ip_address: "192.168.1.102",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idea_id: 4,
          ip_address: "192.168.1.106",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          idea_id: 5,
          ip_address: "192.168.1.103",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idea_id: 5,
          ip_address: "192.168.1.107",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          idea_id: 6,
          ip_address: "192.168.1.104",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idea_id: 6,
          ip_address: "192.168.1.108",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          idea_id: 7,
          ip_address: "192.168.1.105",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idea_id: 7,
          ip_address: "192.168.1.109",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          idea_id: 8,
          ip_address: "192.168.1.106",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          idea_id: 9,
          ip_address: "192.168.1.107",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      
        {
          idea_id: 10,
          ip_address: "192.168.1.108",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      
        {
          idea_id: 11,
          ip_address: "192.168.1.109",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Votes", null, {});
  },
};
