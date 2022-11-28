'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
const Membership = require('./membership');
const Venue = require('./venue');
const GroupImage = require('./groupimage');
const Event = require('./event');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.Venue, { foreignKey: 'groupId' });
      Group.hasMany(models.GroupImage, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Group.hasMany(models.Event, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
      });
      Group.hasMany(models.Membership, {
          foreignKey: 'groupId'
      });
      Group.belongsToMany(models.User, {
        through: models.Membership,
        foreignKey: 'groupId'
      });
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.STRING
    },
    private: {
      type: DataTypes.BOOLEAN
    },
    city: {
      type: DataTypes.STRING(20)
    },
    state: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
