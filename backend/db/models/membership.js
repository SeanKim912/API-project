'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
const Group = require('./group')
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Membership.belongsTo(models.User);
      Membership.belongsTo(models.Group);
    }
  }
  Membership.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
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
    status: {
      type: DataTypes.ENUM('value')
    }
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};
