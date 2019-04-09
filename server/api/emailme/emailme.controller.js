'use strict';

const models = require('../../models/db');

let EmailMe = models.email_me;

exports.findAll = async (req, res) => {
    const email = await EmailMe.findAll();
    res.send(email);
};

exports.delete = async (req, res) => {
    await EmailMe.destroy({
        where: { id: req.params.id }
    }).then((status) => { // rowDeleted will return number of rows deleted
        let email = new EmailMe();
        email.id = req.params.id;
        email.message = status;
        res.send(email);
    }, function(err){
        console.log(err);
    });
};

exports.updateUnreadFlag = async (req, res) => {
    const email = await EmailMe.findOne({
        where: { id: req.params.id }
    });

    email.updateAttributes({
        unread: false
    }).then( (status) => {
        res.send(new EmailMe());
    });
};
