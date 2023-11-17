'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      direccion: {
        type: Sequelize.STRING(100)
      },
      telefono: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      ruc: {
        type: Sequelize.STRING(15)
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clientes');
  }
};