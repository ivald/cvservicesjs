'use strict';

const models = require('../../models/db');

let Login = models.login;
let Role = models.role;

exports.findLoginById = async (req, res) => {
    const login = await Login.findByPk(req.params.id, {
        include: [{
            model: Role,
            as: 'roles'
        }]
    });
    res.send(login);
};

exports.findAll = async (req, res) => {
    const logins = await Login.findAll({
        include: [{
            model: Role,
            as: 'roles'
        }]
    });
    res.send(logins);
};
