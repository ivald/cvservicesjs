const controller = require('./login.controller');
const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

router.get('/all', auth, controller.findAll);
router.get('/:id', auth, controller.findLoginById);
router.post('/login', controller.login);

module.exports = router;
