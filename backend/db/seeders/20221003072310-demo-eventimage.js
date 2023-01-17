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
        url: 'https://imgs.search.brave.com/LYLZRgqRS19YSHjGyw7VUwUWowALE5EJmhv3l75vxP0/rs:fit:1200:800:1/g:ce/aHR0cHM6Ly9jZG4u/dm94LWNkbi5jb20v/dGh1bWJvci9zcmpt/M1BuM0t2WmxSWkYy/MGh6VklOT2FYY2s9/Lzc1eDA6ODg1eDU0/MC8xMjAweDgwMC9m/aWx0ZXJzOmZvY2Fs/KDc1eDA6ODg1eDU0/MCkvY2RuLnZveC1j/ZG4uY29tL3VwbG9h/ZHMvY2hvcnVzX2lt/YWdlL2ltYWdlLzQw/ODA2MzUwL3Rla2tl/bl83X2RldGFpbHMu/MC4wLmpwZw',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://imgs.search.brave.com/vrFRtB7A06B-9ZLlGzI5LLq_OlvdLQKpCsfWtDF0LpI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9kMzUy/NWsxcnlkMjE1NS5j/bG91ZGZyb250Lm5l/dC9oLzg5NC84MzMv/ODU5ODMzODk0LjAu/eC4xLmpwZw',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://imgs.search.brave.com/6YhXw-MqCq5XSj-LgDxZxbBsJO0M5Px-XExtOVwYgUM/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy50/aGUzNTBkZWdyZWVv/dmVuLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxNi8wOC9E/U0NfMDY2MC0xLmpw/Zw',
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
