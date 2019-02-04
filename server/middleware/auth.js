const jwt = require('jsonwebtoken');
const config = require('config');
const userController = require('../api/user/user.controller');

module.exports = async function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        const user = await userController.findUserById(decoded.id);
        req.user = user;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};
