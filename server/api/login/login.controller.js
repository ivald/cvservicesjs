'use strict';

const userController = require('../user/user.controller');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const models = require('../../models/db');
const constant = require('../constant');

let env       = process.env.NODE_ENV || 'development';
let config    = require('../../../config/config.js')[env];

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
    let userParam = new UserInfo(_.pick(req.body, ['userName', 'password']));

    if(constant.GUEST_USERNAME === userParam.userName) {
        userParam.password = config.guest_password;
    }

    if (isNanOrNull(userParam.userName) || isNanOrNull(userParam.password)) {
        return res.status(400).send('Please fill in username and password.');
    }

    const user = await userController.findLoginUserByName(userParam.userName);

    if (isNanOrNull(user)) {
        return res.status(400).send('User name not found.');
    }

    let result = await bcrypt.compare(userParam.password, user.password);

    if(result) {
        const token = UserInfo.generateAuthToken(user.userName);
        user.token = token;
        res.send(user);
    } else {
        return res.status(400).send('Invalid login. Please check your username and password.');
    }
};

function isNanOrNull(element) {
    if(element == null || element == "undefined" || element == undefined ||  element == "")
        return true;
    else
        return false;
}
