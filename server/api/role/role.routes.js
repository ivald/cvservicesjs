const controller = require('./role.controller');
const express = require('express');
const router = express.Router();

router.get('/all', controller.findAll);
router.get('/:id', controller.findRoleById);

module.exports = router;
