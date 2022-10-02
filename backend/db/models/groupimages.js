'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupImages.belongsTo(
        model.Groups,
        { foreignKey: 'groupId' }
      )
    }
  }
  GroupImages.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Groups,
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING(255)
    },
    preview: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'GroupImages',
  });
  return GroupImages;
};
