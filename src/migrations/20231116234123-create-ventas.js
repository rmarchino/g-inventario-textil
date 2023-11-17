'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ventas', {
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
        },
        onDelete: 'CASCADE'
      },
      clienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clientes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      fechaVenta: {
        type: Sequelize.DATE
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ventas');
  }
};