'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Memberships', [
      {
        userId: 1,
        groupId: 1,
        status: 'active'
      },
      {
        userId: 2,
        groupId: 2,
        status: 'active'
      },
      {
        userId: 3,
        groupId: 3,
        status: 'active'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Memberships', {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
