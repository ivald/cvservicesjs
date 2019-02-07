'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
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
    last_name: {
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
    occupation: {
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
    primary_email: {
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
    linked_in_url: {
      type: DataTypes.STRING
    },
    mobile: {
      type: DataTypes.STRING
    },
    image_url: {
      type: DataTypes.STRING
    },
    //  private Byte[] imageBytes;
    public_id: {
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  });

  Profile.associate = (models) => {
    models.profile.hasMany(models.language, { as: 'languages', foreignKey: 'profile_id' }); // puts foreignKey loginId in Role table
  };

  Profile.validate = validateProfile;

  return Profile;
};

function validateProfile(profile) {
  const schema = {
    firstName: Joi.string().min(4).max(32).required().regex(/^[a-z]+$/),
    lastName: Joi.string().min(4).max(32).required().regex(/^[a-z]+$/),
    occupation: Joi.string().min(4).max(32).required().regex(/^[a-z]+$/),
    primaryEmail: Joi.string().min(4).max(32).required().regex(/\\S+@\\S+\\.\\S+"/)
  };

  return Joi.validate(profile, schema);
}
