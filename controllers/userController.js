const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const config = require('../config/config');

module.exports = {
  async postRegister(req, res, next) {
    try {
      const { username, password, admin } = req.body;
      const hash = await bcrypt.hash(password, config.saltRounds)
      const user = new User({ username, password: hash, admin });
      user.save();
      return res.status(201).send(user);
    } catch (error) { next(error); }
  }
} 