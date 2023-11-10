'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Proveedores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      direccion: {
        type: Sequelize.STRING(30)
      },
      telefono: {
        type: Sequelize.STRING(15)
      },
      ruc: {
        type: Sequelize.STRING(15)
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Proveedores');
  }
};