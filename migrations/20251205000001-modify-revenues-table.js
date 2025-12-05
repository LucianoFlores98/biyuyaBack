'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add new fields
    await queryInterface.addColumn('Revenues', 'period', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Revenues', 'increase_frequency', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Remove old fields
    await queryInterface.removeColumn('Revenues', 'date');
    await queryInterface.removeColumn('Revenues', 'increase_rate');
  },

  async down(queryInterface, Sequelize) {
    // Restore old fields
    await queryInterface.addColumn('Revenues', 'date', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });

    await queryInterface.addColumn('Revenues', 'increase_rate', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    });

    // Remove new fields
    await queryInterface.removeColumn('Revenues', 'period');
    await queryInterface.removeColumn('Revenues', 'increase_frequency');
  }
};
