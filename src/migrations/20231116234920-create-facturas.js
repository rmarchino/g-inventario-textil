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
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      ventaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ventas',
          key: 'id'
        }
      },
      fechaFactura: {
        type: Sequelize.DATE
      },
      subTotal: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      igv: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Facturas');
  }
};