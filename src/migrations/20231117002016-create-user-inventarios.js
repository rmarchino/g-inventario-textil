'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserInventarios', {
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
      productoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos',
          key: 'id'
        }
      },
      fechaAccion: {
        type: Sequelize.DATE
      },
      accion: {
        type: Sequelize.ENUM('Agregar', 'Eliminar')
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserInventarios');
  }
};