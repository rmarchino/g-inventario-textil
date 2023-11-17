'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compras extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Compras.hasMany(models.DetailCompras, {foreignKey: 'compraId'});
      Compras.belongsTo(models.Proveedores, {foreignKey: 'proveedorId'});
      Compras.belongsTo(models.Usuarios, { foreignKey: "usuarioId" });
    }
  }
  Compras.init({
    proveedorId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    fechaCompra: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Compras',
    timestamps: false,
  });
  return Compras;
};