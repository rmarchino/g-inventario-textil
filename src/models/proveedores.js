'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proveedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Proveedores.hasMany(models.EntradaProductos, {foreignKey: 'proveedor'});
      Proveedores.belongsTo(models.Usuarios, {foreignKey: 'usuario'});
    }
  }
  Proveedores.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    ruc: DataTypes.STRING,
    email: DataTypes.STRING,
    usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Proveedores',
    timestamps: false,
  });
  return Proveedores;
};