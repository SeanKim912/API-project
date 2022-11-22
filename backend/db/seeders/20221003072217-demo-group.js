'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Groups'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: 'FGC Local',
        about: 'Play fighting games like Street Fighter with other fans',
        type: 'Games',
        private: false,
        city: 'Chicago',
        state: 'IL'
      },
      {
        organizerId: 2,
        name: 'Book Club',
        about: 'Come discuss a new book every month',
        type: 'Arts/Crafts',
        private: true,
        city: 'New York',
        state: 'NY'
      },
      {
        organizerId: 3,
        name: 'Baking Club',
        about: 'Come try new food and swap recipes with other members',
        type: 'Sports',
        private: false,
        city: 'Los Angeles',
        state: 'CA'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['FGC Local', 'Book Club', 'Baking Club'] }
    }, {});
  }
};
