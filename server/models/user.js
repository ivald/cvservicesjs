'use strict';

const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  const UserInfo = sequelize.define('user_info', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      field: 'user_name',
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
    token: {
      type: DataTypes.STRING,
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
      },
      unique: true
    }
  },{
    timestamps: false
  });

  UserInfo.associate = (models) => {
    models.user_info.belongsTo(models.login,  { as: 'login', foreignKey: 'login_id' }); // puts foreignKey UserId in user_info table
    models.user_info.belongsTo(models.profile, { foreignKey: 'profile_id' }); // puts foreignKey UserId in profile table
  };

  UserInfo.validate = validateUser;
  UserInfo.generateAuthToken = generateAuthToken;

  return UserInfo;
};

function generateAuthToken(id) {
  const token = jwt.sign({ id: id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

function validateUser(user) {
  const schema = {
    user_name: Joi.string().min(4).max(32).required().regex(/^[a-z]+$/),
    password: Joi.string().min(5).max(100).required()
  };

  return Joi.validate(user, schema);
}
