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
      Productos.hasMany(models.DetailCompras, {foreignKey: 'productoId'});
      Productos.hasMany(models.UserInventarios, {foreignKey: 'productoId'});
      Productos.hasMany(models.DetailVentas, {foreignKey: 'productoId'});
      Productos.belongsTo(models.Proveedores, {foreignKey: 'proveedorId'});
      Productos.belongsTo(models.Categorias, {foreignKey: 'categoriaId'});
    }
  }
  Productos.init({
    proveedorId: DataTypes.INTEGER,
    categoriaId: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    imagen: DataTypes.STRING,
    precio: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productos',
    timestamps: false,
  });
  return Productos;
};