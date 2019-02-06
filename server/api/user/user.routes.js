const controller = require('./user.controller');
const auth = require('../../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/me', auth, controller.currentUser);
router.get('/:id', controller.findUserInfoById);
router.get('/findAll', controller.findAll);
router.post('/', controller.addUser);

module.exports = router;
