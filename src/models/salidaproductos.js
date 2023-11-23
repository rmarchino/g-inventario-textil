'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalidaProductos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SalidaProductos.belongsTo(models.Productos, {foreignKey: 'producto'});
      SalidaProductos.belongsTo(models.Usuarios, {foreignKey: 'usuario'});
      SalidaProductos.belongsTo(models.Facturas, {foreignKey: 'factura'});
    }
  }
  SalidaProductos.init({
    fecha: DataTypes.DATE,
    cantidad: DataTypes.INTEGER,
    precioUnitario: DataTypes.DECIMAL,
    producto: DataTypes.INTEGER,
    usuario: DataTypes.INTEGER,
    factura: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SalidaProductos',
    timestamps: false,
  });
  return SalidaProductos;
};