const controller = require('./pdf.controller');
const express = require('express');
const router = express.Router();

router.get('/pdf/:name', controller.createPdf);

module.exports = router;
