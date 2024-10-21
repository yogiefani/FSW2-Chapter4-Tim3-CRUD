"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("projects", [
      {
        name: "Apollo Initiative",
        description:
          "Launch a high-performance API gateway for enterprise clients.",
        startAt: "2023-01-15",
        endAt: "2023-04-15",
      },
      {
        name: "Nova Framework",
        description:
          "Develop a new open-source web framework focused on modularity.",
        startAt: "2023-02-01",
        endAt: "2023-05-01",
      },
      {
        name: "Orion Suite",
        description:
          "Create a comprehensive set of productivity tools for remote teams.",
        startAt: "2023-03-10",
        endAt: "2023-06-30",
      },
      {
        name: "Helios Platform",
        description: "Build a platform for decentralized cloud computing.",
        startAt: "2023-04-12",
        endAt: "2023-07-30",
      },
      {
        name: "Zephyr Project",
        description: "Design an energy-efficient IoT network for smart homes.",
        startAt: "2023-05-01",
        endAt: "2023-08-01",
      },
      {
        name: "Aether Engine",
        description:
          "Develop a real-time data processing engine for financial markets.",
        startAt: "2023-06-15",
        endAt: "2023-09-15",
      },
      {
        name: "Atlas Hub",
        description:
          "Create a centralized hub for cross-platform game development tools.",
        startAt: "2023-07-01",
        endAt: "2023-10-01",
      },
      {
        name: "Vega AI",
        description:
          "Implement an AI-driven recommendation system for online retailers.",
        startAt: "2023-08-05",
        endAt: "2023-11-05",
      },
      {
        name: "Phoenix Revival",
        description:
          "Modernize a legacy software system for healthcare providers.",
        startAt: "2023-09-10",
        endAt: "2023-12-10",
      },
      {
        name: "Titan Analytics",
        description:
          "Build a big data analytics platform for enterprise customers.",
        startAt: "2023-10-01",
        endAt: "2024-01-01",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("projects", null, {});
  },
};
