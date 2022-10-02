'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Groups.hasMany([
        [models.Venues,
        { foreignKey: 'groupId' }],
        [models.GroupImages,
        { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true }]
      ]
      );
      Groups.belongsToMany([
        [models.Venues,
        { through: models.Events }],
        [models.User,
        { through: models.Memberships}]
        ])
    }
  }
  Groups.init({
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
    modelName: 'Groups',
  });
  return Groups;
};
