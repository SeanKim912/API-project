'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Venues'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert(options, [
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
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Alpha Ave', '456 Beta Blvd', '789 Gamma Ct'] }
    }, {});
  }
};
