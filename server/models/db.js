'use strict';

let fs        = require('fs');
let path      = require('path');
let Sequelize = require('sequelize');
let basename  = path.basename(__filename);
let env       = process.env.NODE_ENV || 'development';
let config    = require('../../config/config.js')[env];
let db        = {};

const sequelize = new Sequelize({
  username: "hxafmcxavkaamk",
  password: "cc4e3073f4340087ff7e93c2dee6f222a833aa4474453f18a8253aa24eb888dc",
  database: "d9qgu7ab7ol5b8",
  port: 5432,
  host: "ec2-23-23-110-26.compute-1.amazonaws.com",
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: true,
    sslfactory: "org.postgresql.ssl.NonValidatingFactory"
  },
  operatorsAliases: false,
  define: {
    freezeTableName: true
  }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
