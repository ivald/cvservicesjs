'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define('language', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        language_name: {
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
                }
            }
        },
        language_description: {
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
                }
            }
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
