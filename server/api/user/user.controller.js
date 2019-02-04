'use strict';

const bcrypt = require('bcrypt');
const _ = require('lodash');
const models = require('../../models/db');

exports.findUserById = async (id) => {
    const user = await models.User.findByPk(id, {
        attributes: {
            exclude: ['password']
        }
    });
    return user;
};

exports.currentUser = async (req, res) => {
    res.send(findUserById(req.user.id));
};

exports.addUser = async (req, res) => {
    const {error} = models.User.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await models.User.findOne({where: {email: req.body.email}});
    if (user) return res.status(400).send('User already registered.');

    user = await models.User.create(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = models.User.generateAuthToken(user.id);
    res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
};
