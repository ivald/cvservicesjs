'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  const EmailMe = sequelize.define('email_me', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
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
    message: {
      type: DataTypes.STRING,
      fields: ['message', {length: 10240}]
    },
    error: {
      type: DataTypes.STRING
    },
    profileId: {
      type: DataTypes.INTEGER,
      field: 'profile_id',
      allowNull: false
    }
  },{
    timestamps: false
  });

  EmailMe.validate = validateEmailMe;

  return EmailMe;
};

function validateEmailMe(emailMe) {
  const schema = {
    name: Joi.string().min(4).max(32).required().regex(/^[a-z]+$/),
    email: Joi.string().min(4).max(32).required().regex(/\\S+@\\S+\\.\\S+"/)
  };

  return Joi.validate(emailMe, schema);
}

