'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EventImages', [
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
    return queryInterface.bulkDelete('EventImages', {
      eventId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
