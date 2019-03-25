'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
    const Education = sequelize.define('education', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        schoolName: {
            type: DataTypes.STRING,
            field: 'school_name'
        },
        degreeName: {
            type: DataTypes.STRING,
            field: 'degree_name'
        },
        fieldOfStudy: {
            type: DataTypes.STRING,
            field: 'field_of_study'
        },
        grade: {
            type: DataTypes.STRING
        },
        activitiesAndSocieties: {
            type: DataTypes.STRING,
            field: 'activities_and_societies'
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
         isProfessionalCourse: {
            type: DataTypes.BOOLEAN,
            field: 'is_professional_course',
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

    Education.associate = (models) => {
        models.education.hasMany(models.image, { as: 'imageList', foreignKey: 'education_id' }); // puts foreignKey loginId in Role table
    };

    Education.validate = validateEducation;

    return Education;
};

function validateEducation(education) {
    const schema = {
        // Experience validation
    };

    return Joi.validate(education, schema);
}
