'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add period field
    await queryInterface.addColumn('IncreaseRates', 'period', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Remove frequency field
    await queryInterface.removeColumn('IncreaseRates', 'frequency');
  },

  async down(queryInterface, Sequelize) {
    // Restore frequency field
    await queryInterface.addColumn('IncreaseRates', 'frequency', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'monthly'
    });

    // Remove period field
    await queryInterface.removeColumn('IncreaseRates', 'period');
  }
};
