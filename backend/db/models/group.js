'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user')
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(
        models.Venue,
        { foreignKey: 'groupId' }
      );
      Group.hasMany(models.GroupImage,
        { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true }
      );
      Group.belongsToMany(
        models.Venue,
        { through: models.Event, foreignKey: 'groupId' }
      );
      Group.belongsToMany(
        models.User,
        { through: models.Membership, foreignKey: 'groupId'}
        );
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.ENUM('value')
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
