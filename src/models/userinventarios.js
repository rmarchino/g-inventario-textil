'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInventarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserInventarios.belongsTo(models.Productos, {foreignKey: 'productoId'});
      UserInventarios.belongsTo(models.Usuarios, {foreignKey: 'usuarioId'});
    }
  }
  UserInventarios.init({
    usuarioId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    fechaAccion: DataTypes.DATE,
    accion: DataTypes.ENUM('Agregar', 'Eliminar')
  }, {
    sequelize,
    modelName: 'UserInventarios',
    timestamps: false,
  });
  return UserInventarios;
};