'use strict';

const _ = require('lodash');
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
    }).then( () => {
        res.send(new EmailMe());
    });
};

exports.selectUnreadEmails = async (req, res) => {
    await EmailMe.sequelize.query('SELECT count(*) FROM email_me WHERE unread = true and profile_id = ?',
        { replacements: [req.params.id], type: EmailMe.sequelize.QueryTypes.SELECT }
    ).then(result => {
        res.send(result);
    });
};

exports.addEmail = async (req, res) => {
    let emailRes = new EmailMe();

    try {
        const {error} = EmailMe.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let email = EmailMe.build(_.pick(req.body, ['name', 'email', 'message', 'profileId']));

        let ids = await EmailMe.sequelize.query('SELECT max(id)+1 as id FROM email_me',
            {type: EmailMe.sequelize.QueryTypes.SELECT}
        ).then(result => result);

        if(ids[0].id == null)
            email.id = 1;
        else
            email.id = ids[0].id;

        await email.save();

        emailRes.message = 'Your message has been sent.';
    } catch (e) {
        emailRes.error = 'Your message has not been sent';
    }

    res.send(emailRes);
};
