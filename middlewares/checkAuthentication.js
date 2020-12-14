const config = require('../config/config');
const jwt = require('jsonwebtoken');
const { authCookieName, authHeaderName, jwtSecret } = config;

module.exports = function (req, res, next) {
    const token = req.cookies[authCookieName] || req.headers[authHeaderName];
    if (!token) { return next(); }
    jwt.verify(token, jwtSecret, function (err, decoded) {
        if (err) { return res.status(400).send({msg: 'User credentials are not valid, please log in again.'}); }
        req.user = decoded;
        res.locals.isLogged = true;
        next();
    })
}