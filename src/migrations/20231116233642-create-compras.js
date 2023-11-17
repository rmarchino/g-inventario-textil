'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Compras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      proveedorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Proveedores',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      fechaCompra: {
        type: Sequelize.DATE
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Compras');
  }
};