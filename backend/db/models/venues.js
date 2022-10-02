'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Venues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Venues.belongsToMany(
        models.Groups,
        { through: models.Events }
      );
      Venues.belongsTo(
        models.Groups,
        { foreignKey: 'groupId' }
      )
    }
  }
  Venues.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Groups,
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,12]
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Venues',
  });
  return Venues;
};
