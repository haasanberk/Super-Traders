'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          username: 'user1',
          budget: 110.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          username: 'user2',
          budget: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          username: 'user3',
          budget: 220.8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          username: 'user4',
          budget: 110.65,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'shares',
      [
        {
          code: 'AAA',
          rate: 1.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'BBB',
          rate: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'CCC',
          rate: 0.55,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'DDD',
          rate: 0.7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'share_owners',
      [
        {
          id: 1,
          ownerId: 1,
          shareCode: 'DDD',
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          ownerId: 1,
          shareCode: 'AAA',
          quantity: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          ownerId: 1,
          shareCode: 'CCC',
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          ownerId: 2,
          shareCode: 'BBB',
          quantity: 80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          ownerId: 2,
          shareCode: 'AAA',
          quantity: 48,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          ownerId: 3,
          shareCode: 'DDD',
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user', null, bulkDeleteOptions);
    await queryInterface.bulkDelete('share', null, bulkDeleteOptions);
    await queryInterface.bulkDelete('share_owner', null, bulkDeleteOptions);
  },
};
