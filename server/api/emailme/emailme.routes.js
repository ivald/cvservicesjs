const controller = require('./emailme.controller');
const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

router.get('/all', auth, controller.findAll);
router.delete('/delete/:id', auth, controller.delete);
router.put('/update/:id', auth, controller.updateUnreadFlag);

module.exports = router;
