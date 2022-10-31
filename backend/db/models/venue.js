'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
const Group = require('./group');
const Event = require('./event');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Venue.belongsTo(
        models.Group,
        { foreignKey: 'groupId' }
      );
      Venue.hasMany(
        models.Event,
        { foreignKey: 'venueId'}
      )
    }
  }
  Venue.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Group,
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING(100),
    },
    city: {
      type: DataTypes.STRING(20)
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        len: [2,12]
      }
    },
    lat: {
      type: DataTypes.DECIMAL
    },
    lng: {
      type: DataTypes.DECIMAL
    }
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};
