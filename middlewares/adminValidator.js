const { adminList } = require('../config/config');

module.exports = function (req, res, next) {
  const { userId } = req.user;
  const admin = adminList.includes(userId);
  if (admin) { return next(); }
  return next({ msg: 'Not authorized for this operation.', code: 401 })
}

