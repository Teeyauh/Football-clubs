/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Clubs',
      [
        {
          Name: 'Arsenal F.C.',
          Stadium: 'Emirates Stadium',
          Capacity: 60260,
          Manager: 'Mikel Arteta',
          Captain: 'Pierre-Emerick Aubameyang',
          Location: 'North London',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Clubs', null, {})
}
