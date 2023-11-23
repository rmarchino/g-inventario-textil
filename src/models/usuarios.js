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
      Usuarios.hasMany(models.Productos, {foreignKey: 'usuario'});
      Usuarios.hasMany(models.EntradaProductos, {foreignKey: 'usuario'});
      Usuarios.hasMany(models.Proveedores, {foreignKey: 'usuario'});
      Usuarios.hasMany(models.Clientes, {foreignKey: 'usuario'});
      Usuarios.hasMany(models.SalidaProductos, {foreignKey: 'usuario'});
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
    role: DataTypes.ENUM('admin', 'vendedor', 'almacenero')
  }, {
    sequelize,
    modelName: 'Usuarios',
    timestamps: false,
  });
  return Usuarios;
};