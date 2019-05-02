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
          args: ["^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"],
          msg: "Invalid email"
        }
      },
      unique: true
    },
    message: {
      type: DataTypes.STRING,
      fields: ['message', {length: 10485760}]
    },
    error: {
      type: DataTypes.STRING
    },
    unread: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'unread'
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
    name: Joi.string().min(4).max(32).required().regex(/([A-Z])\w+/),
    email: Joi.string().min(4).max(32).required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    message: Joi.string().max(10485760),
    profileId: Joi.number()
  };

  return Joi.validate(emailMe, schema);
}

