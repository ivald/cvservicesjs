'use strict';

const Joi = require('joi');

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            field: 'image_url'
        },
        publicId: {
            type: DataTypes.STRING,
            field: 'public_id'
        },
        sourceUrl: {
            type: DataTypes.STRING,
            field: 'source_url'
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING,
            fields: ['description', {length: 10240}]
        },
        experienceId: {
            type: DataTypes.INTEGER,
            field: 'experience_id',
        },
        educationId: {
            type: DataTypes.INTEGER,
            field: 'education_id',
        }
    },{
        timestamps: false
    });

    Image.validate = validateImage;

    return Image;
};

function validateImage(image) {
    const schema = {
        // Image validation
    };

    return Joi.validate(image, schema);
}
