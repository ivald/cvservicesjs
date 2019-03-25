'use strict';

const models = require('../../models/db');

let Role = models.role;

exports.findRoleById = async (req, res) => {
    const role = await Role.findByPk(req.params.id);
    res.send(role);
};

exports.findAll = async (req, res) => {
    const logins = await Role.findAll();
    res.send(logins);
};
