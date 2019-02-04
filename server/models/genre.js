'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
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
    }
  });

  Genre.validate = validateGenre;

  return Genre;
};

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(4).max(32).required()
  };

  return Joi.validate(genre, schema);
}
