'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
    const Experience = sequelize.define('experience', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING
        },
        company: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        },
        fromYear: {
            type: DataTypes.INTEGER,
            field: 'from_year',
        },
        toYearOrExpected: {
            type: DataTypes.INTEGER,
            field: 'to_year_or_expected',
        },
        startDate: {
            type: DataTypes.STRING,
            field: 'start_date',
        },
        endDate: {
            type: DataTypes.STRING,
            field: 'end_date',
        },
        currentlyWorkHere: {
            type: DataTypes.BOOLEAN,
            field: 'currently_work_here',
        },
        description: {
            type: DataTypes.STRING,
            fields: ['description', {length: 10240}]
        },
        imageName: {
            type: DataTypes.STRING,
            field: 'image_name'
        },
        link: {
            type: DataTypes.STRING
        },
        colorTag: {
            type: DataTypes.STRING,
            field: 'color_tag'
        },
        profileContentId: {
            type: DataTypes.INTEGER,
            field: 'profile_content_id',
        }
    },{
        timestamps: false
    });

    Experience.associate = (models) => {
        models.experience.hasMany(models.image, { as: 'imageList', foreignKey: 'experience_id' }); // puts foreignKey loginId in Role table
    };

    Experience.validate = validateExperience;

    return Experience;
};

function validateExperience(exoerience) {
    const schema = {
        // Experience validation
    };

    return Joi.validate(exoerience, schema);
}
