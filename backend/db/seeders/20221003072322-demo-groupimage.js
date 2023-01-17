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
        url: 'https://imgs.search.brave.com/Ed3J0LsspzNzibkXOh52ImfzguzoZUigRTeda7GxXJE/rs:fit:1200:800:1/g:ce/aHR0cHM6Ly9jZG4w/Mi5uaW50ZW5kby1l/dXJvcGUuY29tL21l/ZGlhL2ltYWdlcy8x/MF9zaGFyZV9pbWFn/ZXMvZ2FtZXNfMTUv/bmludGVuZG9fc3dp/dGNoX2Rvd25sb2Fk/X3NvZnR3YXJlXzEv/SDJ4MV9OU3dpdGNo/RFNfR3VpbHR5R2Vh/clhYQWNjZW50Q29y/ZVBsdXNSX2ltYWdl/MTYwMHcuanBn',
        preview: true,
      },
      {
        groupId: 2,
        url: 'https://imgs.search.brave.com/A3wCPF0vJKcjuN52trnQwFNNZ16yQoln8cVn5pU3Qas/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjcmFmdGVy/LmNvbS9kZXNrdG9w/LzI3Mjc2Ny1hLXN0/YWNrLW9mLW9sZC1s/ZWF0aGVyLWJvdW5k/LWJvb2tzbGVhdGhl/ci1ib3VuZC1iby5q/cGc',
        preview: true
      },
      {
        groupId: 3,
        url: 'https://imgs.search.brave.com/tVbcNJARYuHw_uogZG5by9rPfrIwzEVQyWbbu_KXDo4/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/aGVhbHRoeW9wdGlv/bnMuY29tLnBoL191/cGxvYWRzL2dhbGxl/cml6ZV8yLzcxYzM2/NGQ5YzU5Y2FhOWM3/NGViMDc3MGYxNjMy/ZDJhXzA0LTA2LTE4/XzA1LTExLTIzLmpw/Zw',
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
