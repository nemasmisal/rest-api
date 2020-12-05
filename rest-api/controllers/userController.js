const User = require('../models/userModel');
const Order = require('../models/orderModel');
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
  return cb.cookie(config.authCookieName, token, { expires: new Date(Date.now() + 9000000), httpOnly: true });
}

module.exports = {
  async postRegister(req, res, next) {
    try {
      const { username, password } = req.body;
      const existingUser = User.find({ username });
      if (existingUser) { return res.status(409).send({msg: 'Someone else is using that name already, please choose better one :)'})}
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
      if (token.error) { return res.status(401).send(token); }
      setCookie(token, res);
      return res.status(200).send({ username: user.username, _id: user._id, admin: user.admin });
    } catch (error) { res.status(507).send({ msg: error }); }
  },
  getLogout(req, res) {
    res.clearCookie(config.authCookieName);
    return res.status(204).send();
  },
  async addToFavorites(req, res, next) {
    try {
      const { userId } = req.user;
      const { articleId } = req.body;
      await User.findByIdAndUpdate(userId, { $push: { favorites: articleId } });
      return res.status(202).send({ msg: 'Article successfully added to favorites.' });
    } catch (error) { return res.status(400).send({ msg: 'User with provided ID do not exist.' }) }
  },
  async removeFromFavorites(req, res, next) {
    try {
      const { articleId } = req.body;
      const { userId } = req.user;
      await User.findOneAndUpdate({ _id: userId }, { $pull: { favorites: articleId } })
      return res.status(202).send({ msg: 'Article successfully removed from favorites.' });
    } catch (error) { return res.status(400).send({ msg: 'User with provided ID do not exist.' }) }
  },
  async getBasket(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await User.findById(userId).populate('basket').lean();
      const totalAmount = user.basket.reduce((acc, curr) => acc + Number(curr.price), 0)
      return res.send(user.basket);
    } catch (error) { return res.status(400).send({ msg: 'User with provided ID do not exist.' }) }
  },
  async getFavorites(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await User.findById(userId).populate('favorites').lean();
      return res.send(user.favorites);
    } catch (error) { return res.status(400).send({ msg: 'User with provided ID do not exist.' }) }
  },
  async addToBasket(req, res, next) {
    try {
      const { articleId } = req.body;
      const { userId } = req.user;
      await User.findByIdAndUpdate(userId, { $push: { basket: articleId } })
      return res.status(202).send({ msg: 'Article successfully added to basket.' });
    } catch (error) { return res.status(400).send({ msg: 'User with provided ID do not exist.' }) }
  },
  async removeFromBasket(req, res, next) {
    try {
      const { articleId } = req.body;
      const { userId } = req.user;
      await User.findOneAndUpdate({ _id: userId }, { $pull: { basket: articleId } })
      return res.status(202).send({ msg: 'Article successfully removed from basket.' });
    } catch (error) { return res.status(400).send({ msg: 'User with provided ID do not exist.' }) }
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
      const totalAmount = user.basket.reduce((acc, curr) => acc + Number(curr.price), 0)
      const order = new Order({ creator: userId, articles: user.basket, totalAmount });
      order.save();
      return res.status(202).send({ msg: 'Order was placed successfuly' });
    } catch (error) {
      return res.status(400).send({ msg: 'User with provided ID do not exist.' })
    }
  }
}