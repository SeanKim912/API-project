'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Venues', [
        {
          groupId: 1,
          address: '123 Alpha Ave',
          city: 'Chicago',
          state: 'IL',
          lat: 0.0,
          lng: 0.0
        },
        {
          groupId: 2,
          address: '456 Beta Blvd',
          city: 'New York',
          state: 'NY',
          lat: 0.0,
          lng: 0.0
        },
        {
          groupId: 3,
          address: '789 Gamma Ct',
          city: 'Los Angeles',
          state: 'CA',
          lat: 0.0,
          lng: 0.0
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      address: { [Op.in]: ['123 Alpha Ave', '456 Beta Blvd', '789 Gamma Ct'] }
    }, {});
  }
};
