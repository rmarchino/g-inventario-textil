'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Productos.hasMany(models.EntradaProductos, {foreignKey: 'producto'});
      Productos.hasMany(models.SalidaProductos, {foreignKey: 'producto'});
      Productos.belongsTo(models.Usuarios, {foreignKey: 'usuario'});
      Productos.belongsTo(models.Categorias, {foreignKey: 'categoria'});
    }
  }
  Productos.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    categoria: DataTypes.INTEGER,
    usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productos',
    timestamps: false,
  });
  return Productos;
};