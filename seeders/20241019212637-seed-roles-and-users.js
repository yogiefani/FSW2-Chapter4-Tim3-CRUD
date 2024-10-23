'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed Roles
    await queryInterface.bulkInsert('roles', [
      {
        name: 'Admin',
        description: 'Responsible for managing the application and users.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Technician',
        description: 'Handles service requests and repairs.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'User',
        description: 'Regular customer using the service.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Seed Users
    await queryInterface.bulkInsert('users', [
      {
        name: 'Haikal Nuril',
        email: 'haikalnuril@mail.com',
        phoneNumber: '081234567890',
        photoProfile: 'https://ik.imagekit.io/ft0mydzbzq/default-image.jpg?updatedAt=1728656886102',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rapip',
        email: 'raaapiiip@mail.com',
        phoneNumber: '08234567891',
        photoProfile: 'https://ik.imagekit.io/ft0mydzbzq/default-image.jpg?updatedAt=1728656886102',
        roleId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Yogi Efani',
        email: 'yogiefani@mail.com',
        phoneNumber: '083456789012',
        photoProfile: 'https://ik.imagekit.io/ft0mydzbzq/default-image.jpg?updatedAt=1728656886102',
        roleId: 3, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  }
};
