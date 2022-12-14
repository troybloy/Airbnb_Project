'use strict';
const bcrypt = require('bcryptjs')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        review: "This was an amazing spot!",
        stars: 5,
      },
      {
        userId: 2,
        spotId: 2,
        review: "This was an amazing spot!",
        stars: 3,
      },
      {
        userId: 3,
        spotId: 3,
        review: "This was an amazinggg spot!",
        stars: 2,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3]}
    })
  }
};
