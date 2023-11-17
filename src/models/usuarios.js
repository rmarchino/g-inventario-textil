'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuarios.hasMany(models.Compras, {foreignKey: 'usuarioId'});
      Usuarios.hasMany(models.UserInventarios, {foreignKey: 'usuarioId'});
      Usuarios.hasMany(models.Ventas, {foreignKey: 'usuarioId'});
      Usuarios.hasMany(models.Facturas, {foreignKey: 'usuarioId'});
    }
  }
  Usuarios.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    validEmail: DataTypes.BOOLEAN,
    profileImage: DataTypes.STRING,
    role: DataTypes.ENUM('Almacenero', 'Admin', 'Comprador', 'Vendedor')
  }, {
    sequelize,
    modelName: 'Usuarios',
    timestamps: false,
  });
  return Usuarios;
};