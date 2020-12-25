const User = require('../models/userModel');
const { body } = require('express-validator');

const inputReqs = {
    passwordMinLengh: 5,
    passwordMaxLength: 20,
    usernameMinLength: 4,
    usernameMaxLength: 20,
    pattern: /(^[A-Za-z0-9]+$)/
}

const passwordValidator = [
    body('password').isLength({ min: inputReqs.passwordMinLengh, max: inputReqs.passwordMaxLength })
        .withMessage(`Passowrd length must be at least ${inputReqs.passwordMinLengh} but not more then ${inputReqs.passwordMaxLength} characters long.`),
    body('password').matches(inputReqs.pattern).withMessage(`Password must contains only english letters and/or digits`)
]

const usernameValidator = [
    body('username').isLength({ min: inputReqs.usernameMinLength, max: inputReqs.usernameMaxLength })
        .withMessage(`Username must be at least ${inputReqs.usernameMinLength} but not more then ${inputReqs.usernameMaxLength} characters long.`),
    body('username').matches(inputReqs.userPattern).withMessage('Username must contains only english letters and/or digits'),
    body('username').custom(async username => {
        const existingUser = await User.exists({ username });
        if (existingUser) { throw new Error('Username is already in use by someone else, please choose better one.'); }
        return true;
    })
]

async function existingUser(req, res, next) {
    const { userId } = req.user;
    if (!userId) { return next({ msg: 'Provided user credentials are required.', code: 401 }) }
    const existingUser = await User.exists({ _id: userId })
    if (!existingUser) { return next({ msg: 'Provided user credentials are required.', code: 401 }) }
    return next();
}

module.exports = {
    usernameValidator,
    passwordValidator,
    existingUser
}
