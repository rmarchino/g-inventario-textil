'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING(30)
      },
      lastname: {
        type: Sequelize.STRING(30)
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isEmail:true,
        }
      },
      password: {
        type: Sequelize.TEXT
      },
      validEmail: {
        type: Sequelize.BOOLEAN
      },
      profileImage: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM('Almacenero', 'Admin', 'Comprador', 'Vendedor'),
        defaultValue: 'Almacenero'
      },
    }, {
      timestamps: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};