const controller = require('./user.controller');
const auth = require('../../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/me', auth, controller.currentUser);
router.post('/', controller.addUser);

module.exports = router;
