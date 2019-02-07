'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
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

    Role.validate = validateRole;

    return Role;
};

function validateRole(role) {
    const schema = {
        role_name: Joi.string().regex(/^[a-z]+$/).required()
    };

    return Joi.validate(role, schema);
}
