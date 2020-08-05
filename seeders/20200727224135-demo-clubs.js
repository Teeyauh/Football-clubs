/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Clubs',
      [
        {
          name: 'Arsenal F.C.',
          stadium: 'Emirates Stadium',
          capacity: 60260,
          manager: 'Mikel Arteta',
          captain: 'Pierre-Emerick Aubameyang',
          country: 'England',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Clubs', null, {})
}
