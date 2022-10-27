'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      {
        venueId: 1,
        groupId: 1,
        name: 'Tekken Tournament',
        description: 'City-wide championship tournament for Tekken 7',
        type: 'Competition',
        capacity: 100,
        price: 10,
        startDate: 'January 1, 2024 00:00:00',
        endDate: 'January 2, 2024 00:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Grapes of Wrath Discussion',
        description: 'We will provide snacks and discuss Grapes of Wrath',
        type: 'Social',
        capacity: 10,
        price: 0,
        startDate: 'February 1, 2024 00:00:00',
        endDate: 'February 2, 2024 00:00:00'
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'Cookie Bake Sale',
        description: 'We will be selling cookies we baked as a fundraiser',
        type: 'Fundraiser',
        capacity: '50',
        price: 5,
        startDate: 'March 1, 2024 00:00:00',
        endDate: 'March 2, 2024 00:00:00'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      name: { [Op.in]: ['Tekken Tournament', 'Grapes of Wrath Discussion', 'Cookie Bake Sale'] }
    }, {});
  }
};
