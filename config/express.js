const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const checkAuthentication = require('../middlewares/checkAuthentication');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(checkAuthentication);
};