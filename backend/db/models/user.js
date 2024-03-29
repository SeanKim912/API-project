'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    toSafeObject() {
      const { id, username, email, firstName, lastName } = this; // context will be the User instance
      return { id, firstName, lastName, email };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
        }
      }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
      User.belongsToMany(models.Event, {
        through: models.Attendance,
        foreignKey: 'userId',
        as: 'Attendees'
      });
      User.belongsToMany(models.Group, {
        through: models.Membership,
        foreignKey: 'userId'
      });
      User.hasMany(models.Group, {
        foreignKey: 'organizerId'
      });
      User.hasMany(models.Membership, {
        foreignKey: 'userId',
      });
      User.hasMany(models.Attendance, {
        foreignKey: 'userId'
      });
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error ("Cannot be an email.")
          }
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
  {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: ["hashedPassword", "email", "createdAt", "updatedAt"] }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword"] }
      },
      loginUser: {
        attributes: {}
      },
      viewMembership: {
        attributes: { include: ["id", "firstName", "lastName"] }
      }
    }
  });
  return User;
};
