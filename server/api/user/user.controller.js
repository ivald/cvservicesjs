'use strict';

const bcrypt = require('bcrypt');
const _ = require('lodash');
const models = require('../../models/db');

let UserInfo = models.user_info;

exports.findUserById = async (id) => {
    const user = await UserInfo.findByPk(id, {
        attributes: {
            exclude: ['password', 'token']
        }
    });
    return user;
};

exports.findUserInfoById = async (req, res) => {
    const user = await this.findUserById(req.params.id);
    res.send(user);
};

exports.currentUser = (req, res) => {
    res.send(req.user);
};

exports.findAll = async (req, res) => {
    const users = await UserInfo.findAll({
        attributes: {
            exclude: ['password', 'token']
        }
    });
    res.send(users);
};

exports.addUser = async (req, res) => {
    const {error} = UserInfo.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await UserInfo.findOne({where: {email: req.body.email}});
    if (user) return res.status(400).send('UserInfo already registered.');

    user = await UserInfo.create(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = UserInfo.generateAuthToken(user.id);
    res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
};
