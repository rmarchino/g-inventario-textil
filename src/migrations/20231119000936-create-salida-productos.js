'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SalidaProductos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      cantidad: {
        type: Sequelize.INTEGER,
      },
      precioUnitario: {
        type: Sequelize.DECIMAL(10,2),
      },
      producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      factura: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Facturas',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SalidaProductos');
  }
};