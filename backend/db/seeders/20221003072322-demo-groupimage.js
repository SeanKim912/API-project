'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'GroupImages'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, [
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
    return queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
