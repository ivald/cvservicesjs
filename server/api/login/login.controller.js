'use strict';

const models = require('../../models/db');

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
