'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('IncreaseRates', 'type', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'SUBSCRIPTION',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('IncreaseRates', 'type');
  }
};
