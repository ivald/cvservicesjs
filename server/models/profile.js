'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
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
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
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
    primaryEmail: {
      type: DataTypes.STRING,
      field: 'primary_email',
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
    linkedInUrl: {
      type: DataTypes.STRING,
      field: 'linked_in_url'
    },
    mobile: {
      type: DataTypes.STRING
    },
    github: {
      type: DataTypes.STRING
    },
    docker: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING,
      field: 'image_url'
    },
    imageBytes: {
      type: DataTypes.BLOB,
      field: 'image_bytes'
    },
    publicId: {
      type: DataTypes.STRING,
      field: 'public_id'
    },
    role: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      field: 'role'
    }
  },{
    timestamps: false
  });

  Profile.associate = (models) => {
    models.profile.belongsTo(models.profile_content, {as: 'profileContent', foreignKey: 'profile_content_id' });
    models.profile.hasMany(models.language, { as: 'languageList', foreignKey: 'profile_id' }); // puts foreignKey profileId in Language table
    models.profile.hasMany(models.email_me, { as: 'emailMeList', foreignKey: 'profileId' }); // puts foreignKey profileId in EmailMe table
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
