'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailCompras extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailCompras.belongsTo(models.Compras, {foreignKey: 'compraId'});
      DetailCompras.belongsTo(models.Productos, {foreignKey: 'productoId'});
    }
  }
  DetailCompras.init({
    compraId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    precioUnitario: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'DetailCompras',
    timestamps: false,
  });
  return DetailCompras;
};