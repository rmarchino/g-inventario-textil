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
      Facturas.belongsTo(models.Usuarios, {foreignKey: 'usuarioId'});
      Facturas.belongsTo(models.Ventas, {foreignKey: 'ventaId'});
    }
  }
  Facturas.init({
    usuarioId: DataTypes.INTEGER,
    ventaId: DataTypes.INTEGER,
    fechaFactura: DataTypes.DATE,
    subTotal: DataTypes.DECIMAL,
    igv: DataTypes.INTEGER,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Facturas',
    timestamps: false,
  });
  return Facturas;
};