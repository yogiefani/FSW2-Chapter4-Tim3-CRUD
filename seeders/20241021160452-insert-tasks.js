"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("tasks", [
      {
        id: 1,
        name: "Design Database",
        description: "Create ERD and define relationships",
        userId: 1,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Implement API",
        description: "Develop CRUD operations for tasks",
        userId: 2,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Frontend Development",
        description: "Create user interface for task management",
        userId: 3,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Testing",
        description: "Perform unit and integration testing",
        userId: 1,
        projectId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: "Deployment",
        description: "Deploy application to staging environment",
        userId: 2,
        projectId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: "Bug Fixing",
        description: "Fix bugs identified during testing",
        userId: 3,
        projectId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: "Code Review",
        description: "Review code quality and standards",
        userId: 1,
        projectId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: "Database Optimization",
        description: "Optimize queries for better performance",
        userId: 2,
        projectId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: "API Documentation",
        description: "Document all available API endpoints",
        userId: 3,
        projectId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: "User Acceptance Testing",
        description: "Conduct UAT with stakeholders",
        userId: 1,
        projectId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("tasks", null, {});
  }
};
