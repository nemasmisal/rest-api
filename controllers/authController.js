const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

async function createToken(user, providedPassword) {
  const match = await bcrypt.compare(providedPassword, user.password);
  if (!match) { return ({ msg: 'Username or password don`t match!' }) };
  const token = jwt.sign({ userId: user._id, username: user.username }, config.jwtSecret);
  return token;
}

function setCookie(token, cb) {
  return cb.cookie(config.authCookieName, token, { expires: new Date(Date.now() + 9000000), httpOnly: true, sameSite: true });
}

module.exports = {
  async postRegister(req, res, next) {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) { return res.status(409).send({ msg: 'Someone else is using that name already, please choose better one :)' }) }
      const hash = await bcrypt.hash(password, config.saltRounds)
      const user = new User({ username, password: hash });
      await user.save();
      const token = await createToken(user, password, next);
      setCookie(token, res);
      return res.status(201).send({ username: user.username, _id: user._id, admin: user.admin });
    } catch (error) { res.status(507).send({ msg: error }); }
  },
  async postLogin(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) { return res.status(401).send({ msg: 'Wrong Username or Password!' }); }
      const token = await createToken(user, password);
      if (token.msg) { return res.status(401).send(token); }
      setCookie(token, res);
      return res.status(200).send({ username: user.username, _id: user._id, admin: user.admin });
    } catch (error) { res.status(507).send({ msg: error }); }
  },
  getLogout(req, res) {
    res.clearCookie(config.authCookieName);
    return res.status(204).send();
  },
  async checkAuth(req, res, next) {
    try {
      const { userId } = req.user;
      if (!userId) { return res.status(202).send(); }
      const user = await User.findById(userId).populate(['basket', 'favorites']).lean();
      return res.send({ username: user.username, _id: user._id, admin: user.admin })
    } catch (error) {
      return res.status(204).send();
    }
  }
}
