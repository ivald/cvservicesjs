'use strict';

const models = require('../../models/db');

let EmailMe = models.email_me;

exports.findAll = async (req, res) => {
    const email = await EmailMe.findAll();
    res.send(email);
};
