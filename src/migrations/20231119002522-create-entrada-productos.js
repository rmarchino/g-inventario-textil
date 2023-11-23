'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EntradaProductos', {
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
        allowNull: false,
      },
      precioUnitario: {
        type: Sequelize.DECIMAL(10,2)
      },
      importe: {
        type: Sequelize.DECIMAL(10,2)
      },
      producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos',
          key: 'id'
        }
      },
      usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      proveedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Proveedores',
          key: 'id'
        }
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EntradaProductos');
  }
};