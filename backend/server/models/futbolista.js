'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Futbolista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Futbolista.belongsTo(models.Equipo, {
        foreignKey: "team_id",
        as: 'team'
      })

    }
  }
  Futbolista.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    squad_number: DataTypes.INTEGER,
    position: DataTypes.STRING,
    nationality: DataTypes.STRING,
    team_id: DataTypes.INTEGER,
    EquipoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Futbolista',
  });
  return Futbolista;
};