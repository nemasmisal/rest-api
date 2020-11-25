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
      return res.status(201).send({ username: user.username, id: user._id, favorites: user.favorites, basket: user.basket });
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
      return res.status(200).send({ username: user.username, id: user._id, favorites: user.favorites, basket: user.basket, admin: false });
    } catch (error) { next(error); }
  },
  getLogout(req, res) {
    res.clearCookie(config.authCookieName);
    return res.status(204).send({ msg: 'successfully logged out' });
  },
  async addToFavorites(req, res, next) {
    const { articleId, userId } = req.body;
    await User.findByIdAndUpdate(userId, { $push: { favorites: articleId } }, (err, user) => {
      if (err) { return res.status(400).send({ msg: 'User with provided ID do not exist.' }) }
      return res.status(202).send({ msg: 'Article successfully added to favorites.' });
    })
  },
  async addToBasket(req, res, next) {
    const { articleId, userId } = req.body;
    await User.findByIdAndUpdate(userId, { $push: { basket: articleId } }, (err, user) => {
      if (err) { return res.status(400).send({ msg: 'User with provided ID do not exist.' }) }
      return res.status(202).send({ msg: 'Article successfully added to basket.' });
    })
  },
  async getProfile(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).populate(['basket', 'favorites']).lean();
      return res.send({ username: user.username, basket: user.basket, favorites: user.favorites })
    } catch (error) {
      return res.status(400).send({ msg: 'User with provided ID do not exist.' })
    }
  },
  async placeOrder(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await User.findByIdAndUpdate(userId, { $set: { basket: [] } }).populate('basket').lean();
      if (!user) { return res.status(400).send({ msg: 'User with provided ID do not exist.' }) }
      const admin = await User.findByIdAndUpdate(config.adminId, { $push: { orders: user.basket } })
      if (admin) { return res.status(202).send({ msg: 'Order was placed successfuly' }); }
    } catch (error) {
      return res.status(400).send({ msg: 'User with provided ID do not exist.' })
    }
  }
}