'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      userId: {
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL'
      },
      projectId: {
        references: {
          model: 'projects',
          key: 'id'
        },
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};