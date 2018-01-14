'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accomodations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_employee: {
        type: Sequelize.INTEGER
      },
      id_bill: {
        type: Sequelize.INTEGER
      },
      id_room: {
        type: Sequelize.INTEGER
      },
      arrivelDate: {
        type: Sequelize.DATE
      },
      nrNights: {
        type: Sequelize.INTEGER
      },
      nrAdults: {
        type: Sequelize.INTEGER
      },
      nrChildrens: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('accomodations');
  }
};