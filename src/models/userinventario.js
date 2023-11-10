'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInventario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserInventario.belongsTo(models.Usuarios, {foreignKey: 'usuarioId'});
      UserInventario.belongsTo(models.Productos, {foreignKey: 'productoId'});
    }
  }
  UserInventario.init({
    usuarioId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    accion: DataTypes.ENUM('Agregar', 'Eliminar')
  }, {
    sequelize,
    modelName: 'UserInventario',
  });
  return UserInventario;
};