/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clubs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      Stadium: {
        type: Sequelize.STRING
      },
      Capacity: {
        type: Sequelize.INTEGER
      },
      Manager: {
        type: Sequelize.STRING
      },
      Captain: {
        type: Sequelize.STRING
      },
      Country: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clubs')
  }
}
