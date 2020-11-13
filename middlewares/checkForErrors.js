const { validationResult } = require('express-validator');

module.exports = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.errors.reduce((acc, curr) => { acc.push(curr.msg); return acc }, [])
    return res.send(errorMsg);
  }
  next();
}
