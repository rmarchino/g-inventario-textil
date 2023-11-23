'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Facturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      precioUnitario: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      importe: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      subTotal: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      igv: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clientes',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Facturas');
  }
};