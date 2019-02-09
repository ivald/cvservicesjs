'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
    const Summary = sequelize.define('summary', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.TEXT
        },
        profileContentId: {
          type: DataTypes.INTEGER,
          field: 'profile_content_id'
        }
    },{
        timestamps: false
    });

    Summary.validate = validateSummary;

    return Summary;
};

function validateSummary(summary) {
    const schema = {
        //..Summary validation
    };

    return Joi.validate(summary, schema);
}
