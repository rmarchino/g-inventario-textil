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
      Ventas.hasMany(models.DetailVentas, { foreignKey: 'VentaId' });
      Ventas.hasMany(models.Facturas, { foreignKey: 'VentaId' });
      Ventas.belongsTo(models.Clientes,{foreignKey:'clienteId'});
      Ventas.belongsTo(models.Usuarios,{foreignKey:'usuarioId'});
      
    }
  }
  Ventas.init({
    usuarioId: DataTypes.INTEGER,
    clienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ventas',
  });
  return Ventas;
};