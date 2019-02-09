const controller = require('./user.controller');
const auth = require('../../middleware/auth');
const express = require('express');
const router = express.Router();

// router.get('/me', auth, controller.currentUser);
// router.get('/all', controller.findAll);
// router.get('/:id', controller.findUserInfoById);
// router.post('/', controller.addUser);
router.get('/public/main/home/:name', controller.findUserInfoByName);

module.exports = router;
