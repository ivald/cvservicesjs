const controller = require('./login.controller');
const express = require('express');
const router = express.Router();

router.get('/all', controller.findAll);
router.get('/:id', controller.findLoginById);

module.exports = router;
