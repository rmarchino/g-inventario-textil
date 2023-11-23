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
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      dni: {
        type: Sequelize.STRING(8)
      },
      direccion: {
        type: Sequelize.STRING(100)
      },
      telefono: {
        type: Sequelize.STRING(15),
        allowNulla: false,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: 'id',
        }
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clientes');
  }
};