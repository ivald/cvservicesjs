'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
  const ProfileContent = sequelize.define('profile_content', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    profileId: {
      type: DataTypes.INTEGER,
      field: 'profile_id',
      allowNull: false
    },
    summaryId: {
      type: DataTypes.INTEGER,
      field: 'summary_id',
      allowNull: false
    }
  },{
    timestamps: false
  });

  ProfileContent.associate = (models) => {
    models.profile_content.belongsTo(models.summary, { as: 'summary', foreignKey: 'summary_id' });
    models.profile_content.hasMany(models.experience, { as: 'experienceList', foreignKey: 'profile_content_id' }); // puts foreignKey loginId in Role table
    models.profile_content.hasMany(models.education, { as: 'educationList', foreignKey: 'profile_content_id' }); // puts foreignKey loginId in Role table
  };

  ProfileContent.validate = validateProfile;

  return ProfileContent;
};

function validateProfile(profile) {
  const schema = {
    profileId: Joi.number().required()
  };

  return Joi.validate(profile, schema);
}
