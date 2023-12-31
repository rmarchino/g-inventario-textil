'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facturas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Facturas.hasMany(models.SalidaProductos, {foreignKey: 'factura'});
      Facturas.belongsTo(models.Clientes, {foreignKey: 'cliente'});
    }
  }
  Facturas.init({
    cantidad: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    precioUnitario: DataTypes.DECIMAL,
    importe: DataTypes.DECIMAL,
    subTotal: DataTypes.DECIMAL,
    igv: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    cliente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Facturas',
    timestamps: false,
  });
  return Facturas;
};