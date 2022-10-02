'use strict';
const {
  Model
} = require('sequelize');
const venues = require('./venues');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Events.hasMany(
        model.EventImages,
        { foreignKey: 'eventId', onDelete: 'CASCADE', hooks: true }
      );
      Events.belongsToMany(
        model.User,
        { through: models.Attendances }
      )
    }
  }
  Events.init({
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: venues,
        key: 'id'
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Groups,
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.ENUM('value')
    },
    capacity: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.INTEGER
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};
