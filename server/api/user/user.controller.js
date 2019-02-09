'use strict';

const bcrypt = require('bcrypt');
const _ = require('lodash');
const models = require('../../models/db');

let UserInfo = models.user_info;
let Profile = models.profile;
let ProfileContent = models.profile_content;
let Summary = models.summary;
let Experience = models.experience;
let Education = models.education;
let Image = models.image;
let Language = models.language;
let Login = models.login;
let Role = models.role;

exports.findUserById = async (id) => {
    const user = await UserInfo.findByPk(id, {
        include: [
            {
                model: Profile,
                attributes: {
                    exclude: ['profile_content_id']
                },
                include: [
                    {
                        model: ProfileContent, as: 'profileContent',
                        attributes: {
                            exclude: ['summary_id']
                        },
                        include: [
                            {
                                model: Summary, as: 'summary'
                            },
                            {
                                model: Experience, as: 'experienceList',
                                attributes: {
                                    exclude: ['profile_content_id']
                                },
                                include: [{
                                    model: Image, as: 'imageList',
                                    attributes: {
                                        exclude: ['experience_id', 'education_id']
                                    }
                                }]
                            },
                            {
                                model: Education, as: 'educationList',
                                attributes: {
                                    exclude: ['profile_content_id']
                                },
                                include: [{
                                    model: Image, as: 'imageList',
                                    attributes: {
                                        exclude: ['experience_id', 'education_id']
                                    }
                                }]
                            }
                        ]
                    },
                    {
                        model: Language, as: 'languageList',
                        attributes: {
                            exclude: ['profile_id']
                        }
                    }]
            },
            {
                model: Login, as: 'login',
                include: [{
                    model: Role, as: 'role',
                }]
            }
        ],
        attributes: {
            exclude: ['password', 'token', 'login_id', 'profile_id']
        }
    });
    return user;
};

exports.findUserInfoById = async (req, res) => {
    const user = await this.findUserById(req.params.id);
    res.send(user);
};

exports.findUserInfoByName = async (req, res) => {
    const user = await UserInfo.findAll({
        where: {
            userName: req.params.name
        },
        include: [
            {
                model: Profile,
                attributes: {
                    exclude: ['profile_content_id']
                },
                include: [
                    {
                        model: ProfileContent, as: 'profileContent',
                        attributes: {
                            exclude: ['summary_id']
                        },
                        include: [
                            {
                                model: Summary, as: 'summary'
                            },
                            {
                                model: Experience, as: 'experienceList',
                                attributes: {
                                    exclude: ['profile_content_id']
                                },
                                include: [{
                                    model: Image, as: 'imageList',
                                    attributes: {
                                        exclude: ['experience_id', 'education_id']
                                    }
                                }]
                            },
                            {
                                model: Education, as: 'educationList',
                                attributes: {
                                    exclude: ['profile_content_id']
                                },
                                include: [{
                                    model: Image, as: 'imageList',
                                    attributes: {
                                        exclude: ['experience_id', 'education_id']
                                    }
                                }]
                            }
                        ]
                    },
                    {
                        model: Language, as: 'languageList',
                        attributes: {
                            exclude: ['profile_id']
                        }
                    }]
            },
            {
                model: Login, as: 'login',
                include: [{
                    model: Role, as: 'role',
                }]
            }
        ],
        attributes: {
            exclude: ['password', 'token', 'login_id', 'profile_id']
        }
    });
    res.send(user[0].profile);
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
