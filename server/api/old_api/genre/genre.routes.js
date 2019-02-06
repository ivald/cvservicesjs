const controller = require('./genre.controller');
const auth = require('../../../middleware/auth');
const admin = require('../../../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/', controller.findAllGenre);
router.post('/', auth, controller.addGenre);
router.put('/:id', controller.updateGenre);
router.delete('/:id', [auth, admin], controller.removeGenre);
router.get('/:id', controller.findGenreById);

module.exports = router;
