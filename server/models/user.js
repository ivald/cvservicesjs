'use strict';

const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Required"
        },
        is: {
          args: ["^[a-z]+$", 'i'],
          msg: "Only letters allowed"
        },
        len: {
          args: [4, 32],
          msg: "String length is not in this range"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Required"
        },
        is: {
          args: ["\\S+@\\S+\\.\\S+"],
          msg: "Invalid email"
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Required"
        },
        len: {
          args: [5, 100],
          msg: "String length is not in this range"
        }
      }
    },
    isAdmin: DataTypes.BOOLEAN
  });

  User.associate = (models) => {
    models.User.belongsToMany(models.Book, { as: 'Reading', through: 'ReadingList'});
  };

  User.validate = validateUser;
  User.generateAuthToken = generateAuthToken;

  return User;
};

function generateAuthToken(id) {
  const token = jwt.sign({ id: id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}
