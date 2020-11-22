const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

async function createToken(user, providedPassword, errorCB) {
  const match = await bcrypt.compare(providedPassword, user.password);
  if (!match) { return errorCB('Username or password don`t match!') };
  const token = jwt.sign({ userId: user._id, username: user.username }, config.jwtSecret);
  return token;
}

function setCookie(token, cb) {
  return cb.cookie(config.authCookieName, token, { expires: new Date(Date.now() + 9000000), httpOnly: true });
}

module.exports = {
  async postRegister(req, res, next) {
    try {
      const { username, password } = req.body;
      const hash = await bcrypt.hash(password, config.saltRounds)
      const user = new User({ username, password: hash });
      user.save();
      const token = await createToken(user, password, next);
      setCookie(token, res);
      return res.status(201).send(user);
    } catch (error) { next(error); }
  },

  async postLogin(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) { return res.status(401).send('Wrong Username or Password!'); }
      const token = await createToken(user, password, err => {
        if (err) { return res.status(401).send(err); }
      });
      if (!token) { return; }
      setCookie(token, res);
      return res.status(200).send(user);
    } catch (error) { next(error); }
  },
  getLogout(req, res) {
    res.clearCookie(config.authCookieName);
    return res.status(204).end();
  }
} 



/*
module.exports = {
  getRegister(req, res) {
    res.render('register');
  },
  async postRegister(req, res, next) {
    try {
      const { username, password } = req.body;
      const hash = await bcrypt.hash(password, config.saltRounds)
      const user = new User({ username, password: hash });
      user.save();
      const token = await createToken(user, password, next);
      setCookie(token, res);
      return res.redirect('/');
    } catch (error) { next(error); }
  },
  getLogin(req, res) {
    res.render('login');
  },
  async postLogin(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) { return res.render('login', { errors: [{ msg: 'Wrong User or Password!' }] }) }
      const token = await createToken(user, password, err => {
        if (err) { return res.render('login', { errors: [{ msg: err }] }); }
      });
      if (!token) { return; }
      setCookie(token, res);
      return res.redirect('/');
    } catch (error) { next(error); }
  },
  getLogout(req, res) {
    res.clearCookie(config.authCookieName);
    return res.redirect('/');
  }
} */