'use strict';
const userController = require('../user/user.controller');

const models = require('../../models/db');

let UserInfo = models.user_info;
let Login = models.login;
let Role = models.role;

exports.findLoginById = async (req, res) => {
    const login = await Login.findByPk(req.params.id, {
        include: [{
            model: Role,
            as: 'role'
        }],
        attributes: {
            exclude: ['profile_id']
        }
    });
    res.send(login);
};

exports.findAll = async (req, res) => {
    const logins = await Login.findAll({
        include: [{
            model: Role,
            as: 'role'
        }]
    });
    res.send(logins);
};

exports.login = async (req, res) => {
    const user = await userController.findUserByName(req.body.userName);
    const token = UserInfo.generateAuthToken(user.userName);
    user.token = token;
    res.send(user);
};
