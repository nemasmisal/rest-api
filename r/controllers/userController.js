const User = require('../models/userModel');
const Order = require('../models/orderModel');
const bcrypt = require('bcrypt');
const config = require('../config/config');

module.exports = {
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
  },
  async getUsers(req, res, next) {
    try {
      const users = await User.find({}).lean();
      return res.send(users);
    } catch (error) { return res.status(507).send({ msg: 'The method could not be performed.' }); }
  },
  async updateUser(req, res, next) {
    try {
      const { username, password, admin, userId } = req.body;
      if (password !== '') {
        const hash = await bcrypt.hash(password, config.saltRounds)
        await User.findByIdAndUpdate(userId, { username, password: hash, admin: admin === 'true' ? true : false })
        return res.status(202).send({ msg: 'Successfully updated user data.' });
      }
      await User.findByIdAndUpdate(userId, { username, admin: admin === 'true' ? true : false });
      return res.status(202).send({ msg: 'Successfully updated user data.' });

    } catch (error) { return res.status(507).send({ msg: 'The method could not be performed.' }); }
  }
}

