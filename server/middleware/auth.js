const jwt = require('jsonwebtoken');
let env       = process.env.NODE_ENV || 'development';
let config    = require('../../config/config.js')[env];
const userController = require('../api/user/user.controller');

module.exports = async function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    if (!token.startsWith("Bearer ")) {
      return res.status(401).send("Access denied. Invalid Authorization header.");
    }

    try {
        const decoded = jwt.verify(token.substring(7), config.jwt_secret_key);
        const user = await userController.findUserByName(decoded['sub']);
        req.user = user;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};
