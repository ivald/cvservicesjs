'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define('login', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },{
    timestamps: false
  });

  Login.associate = (models) => {
    // models.login.belongsTo(models.user_info, { as: 'userInfoRef',  foreignKey: 'user_info_id' }); // puts foreignKey UserId in Login table
    models.login.hasMany(models.role, { as: 'role', foreignKey: 'login' }); // puts foreignKey loginId in Role table
  };

  Login.validate = validateLogin;

  return Login;
};

function validateLogin(login) {
  const schema = {
    //id: Joi.number().integer().required() -- example
  };

  return Joi.validate(login, schema);
}
