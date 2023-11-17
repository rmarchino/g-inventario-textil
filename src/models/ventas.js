'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ventas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ventas.hasMany(models.Facturas, {foreignKey: 'ventaId'});
      Ventas.hasMany(models.DetailVentas, {foreignKey: 'ventaId'});
      Ventas.belongsTo(models.Clientes, {foreignKey: 'clienteId'});
      Ventas.belongsTo(models.Usuarios, {foreignKey: 'usuarioId'});
    }
  }
  Ventas.init({
    usuarioId: DataTypes.INTEGER,
    clienteId: DataTypes.INTEGER,
    fechaVenta: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ventas',
    timestamps: false,
  });
  return Ventas;
};