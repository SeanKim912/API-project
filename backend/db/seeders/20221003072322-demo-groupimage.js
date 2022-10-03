'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupImages', [
      {
        groupId: 1,
        url: '../../sample_images/fgc.webp',
        preview: true,
      },
      {
        groupId: 2,
        url: '../../sample_images/bookclub.webp',
        preview: true
      },
      {
        groupId: 3,
        url: '../../sample_images/baking.webp',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('GroupImages', {
      groupId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
