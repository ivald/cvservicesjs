'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define('language', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        languageName: {
            type: DataTypes.STRING,
            field: 'language_name',
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Required"
                },
                is: {
                    args: ["^[a-z]+$", 'i'],
                    msg: "Only letters allowed"
                }
            }
        },
        languageDescription: {
            type: DataTypes.STRING,
            field: 'language_description',
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Required"
                },
                is: {
                    args: ["^[a-z]+$", 'i'],
                    msg: "Only letters allowed"
                }
            }
        },
        profileId: {
            type: DataTypes.INTEGER,
            field: 'profile_id',
        }
    },{
        timestamps: false
    });

    Language.validate = validateLanguage;

    return Language;
};

function validateLanguage(language) {
    const schema = {
        language_name: Joi.string().regex(/^[a-z]+$/).required(),
        language_description: Joi.string().regex(/^[a-z]+$/).required()
    };

    return Joi.validate(language, schema);
}
