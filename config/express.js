const express = require('express');
const cookieParser = require('cookie-parser');
const checkAuthentication = require('../middlewares/checkAuthentication');

module.exports = (app) => {
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(checkAuthentication);
  app.set('trust proxy', true);
};