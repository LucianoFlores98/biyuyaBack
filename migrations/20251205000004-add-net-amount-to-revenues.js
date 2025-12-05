'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Revenues', 'net_amount', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      comment: 'Salario neto (solo para type=SALARY)'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Revenues', 'net_amount');
  }
};
