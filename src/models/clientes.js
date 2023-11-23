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
      Clientes.belongsTo(models.Usuarios, {foreignKey: 'usuario'});
      Clientes.hasMany(models.Facturas, {foreignKey: 'cliente'});
    }
  }
  Clientes.init({
    nombre: DataTypes.STRING,
    dni: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,
    usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Clientes',
    timestamps: false,
  });
  return Clientes;
};