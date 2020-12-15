const User = require('../models/userModel');

module.exports = async function (req, res, next) {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ _id: userId });
    if (user.admin) { return next(); }
    return next({ msg: 'Not authorized for this operation.', code: 401 })
  } catch (error) { return next({ msg: 'Not authorized for this operation.', code: 401 }); }
}

