'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Equipo.hasMany(models.Futbolista, {
        foreignKey: 'team_id'
      })
    }
  }
  Equipo.init({
    name: DataTypes.STRING,
    league: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Equipo',
  });
  return Equipo;
};