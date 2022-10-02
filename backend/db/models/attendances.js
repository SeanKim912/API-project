'use strict';
const {
  Model
} = require('sequelize');
const events = require('./events');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Attendances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attendances.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Events,
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('value')
    }
  }, {
    sequelize,
    modelName: 'Attendances',
  });
  return Attendances;
};
