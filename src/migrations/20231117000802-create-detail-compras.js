'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailCompras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      compraId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Compras',
          key: 'id',
        }
      },
      productoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos',
          key: 'id',
        }
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      precioUnitario: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetailCompras');
  }
};