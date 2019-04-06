const controller = require('./emailme.controller');
const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

router.get('/all', auth, controller.findAll);

module.exports = router;
