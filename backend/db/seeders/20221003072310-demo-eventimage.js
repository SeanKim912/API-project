'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'EventImages'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: '../../sample_images/tekken7.webp',
        preview: true
      },
      {
        eventId: 2,
        url: '../../sample_images/grapesofwrath.webp',
        preview: true
      },
      {
        eventId: 3,
        url: '../../sample_images/cookies.webp',
        preview: true
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
