'use strict';

const models = require('../../models/db');

exports.findAllGenre = async (req, res) => {
  const genres = await models.Genre.findAll();
  res.send(genres);
};

exports.addGenre = async (req, res) => {
  const { error } = models.Genre.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await models.Genre.create({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
};

exports.updateGenre = async (req, res) => {
  const { error } = models.Genre.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await models.Genre.update({ name: req.body.name }, { where: { id: req.params.id }});

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
};

exports.removeGenre = async (req, res) => {
  const status = await models.Genre.destroy({ where: { id: req.params.id }});

  if (!status) return res.status(404).send('The genre with the given ID was not found.');

  res.send('Genre successfully deleted.');
};

exports.findGenreById = async (req, res) => {
  const genre = await models.Genre.findByPk(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
};
