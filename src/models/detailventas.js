'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailVentas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailVentas.belongsTo(models.Ventas, {foreignKey: 'ventaId'});
      DetailVentas.belongsTo(models.Productos, {foreignKey: 'productoId'});
    }
  }
  DetailVentas.init({
    ventaId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    precioUnitario: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'DetailVentas',
    timestamps: false,
  });
  return DetailVentas;
};