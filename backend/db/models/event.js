'use strict';
const {
  Model
} = require('sequelize');
const Group = require('./group')
const Venue = require('./venue');
const EventImage = require('./eventimage')
const User = require('./user')
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(
        models.EventImage,
        { foreignKey: 'eventId', onDelete: 'CASCADE', hooks: true }
      );
      Event.belongsToMany(
        models.User,
        { through: models.Attendance, foreignKey: 'eventId' }
      );
      Event.belongsTo(
        models.Venue,
        { foreignKey: 'venueId' }
      );
      Event.belongsTo(
        models.Group,
        { foreignKey: 'groupId'}
      )
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Venue,
        key: 'id'
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Group,
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
      type: DataTypes.STRING
    },
    capacity: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.DECIMAL
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
