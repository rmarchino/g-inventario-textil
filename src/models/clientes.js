'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clientes.hasMany(models.Ventas, {foreignKey: 'clienteId'});
    }
  }
  Clientes.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    ruc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clientes',
    timestamps: false,
  });
  return Clientes;
};