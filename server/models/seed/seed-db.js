'use strict';

const models = require('../db');
const _USERS = require('./users');
const _BOOKS = require('./books');
const _GENRES = require('./genres');

module.exports = {
    insert: () => {
        models.User.bulkCreate(_USERS)
            .then(() => {
                models.Book.bulkCreate(_BOOKS)
                    .then(() => {
                        models.Genre.bulkCreate(_GENRES)
                            .then(res => {
                                console.log('Success adding users, genres and books.')
                            })
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }
};
