'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categorias.hasMany(models.Productos, {foreignKey: 'categoria'});
    }
  }
  Categorias.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorias',
    timestamps: false,
  });
  return Categorias;
};