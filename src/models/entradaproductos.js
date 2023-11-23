'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntradaProductos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EntradaProductos.belongsTo(models.Usuarios, {foreignKey:'usuario'});
      EntradaProductos.belongsTo(models.Productos, {foreignKey:'producto'});
      EntradaProductos.belongsTo(models.Proveedores, {foreignKey:'proveedor'});

    }
  }
  EntradaProductos.init({
    fecha: DataTypes.DATE,
    cantidad: DataTypes.INTEGER,
    precioUnitario: DataTypes.DECIMAL,
    importe: DataTypes.DECIMAL,
    producto: DataTypes.INTEGER,
    usuario: DataTypes.INTEGER,
    proveedor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EntradaProductos',
    timestamps: false,
  });
  return EntradaProductos;
};