const User = require('../models/userModel');

const inputReqs = {
    passwordLengh: 5,
    usernameLength: 4,
    userPattern: /(^[A-Za-z0-9]+$)/
}

async function registerValidator(req, res, next) {
    const { username, password } = req.body;
    const errors = [];

    if (!username || !password) { return res.status(400).send('Username and Password are required.') }
    if (username.length < inputReqs.usernameLength) { errors.push(`Username length must be at least ${inputReqs.usernameLength} characters.`); }
    if (password.length < inputReqs.passwordLengh) { errors.push(`Passowrd length must be at least ${inputReqs.passwordLengh} symbols.`); }
    if (!password.match(inputReqs.userPattern)) { errors.push('Password must contains only english letters and/or digits.'); }
    if (!username.match(inputReqs.userPattern)) { errors.push('Username must contains only english letters and/or digits.'); }
    if (errors.length > 0) { return res.status(400).send(errors.join(' ')); }

    const existingUser = await User.exists({ username });
    if (existingUser) { return res.status(409).send({ msg: 'Username is already in use by someone else, please choose another one.' }); }

    return next();
}

async function existingUser(req, res, next) {
    const { userId } = req.body;
    if (!userId) { return res.status(401).send({ msg: 'Provided user credentials are required.' }) }
    const existingUser = await User.exists({ id: userId })
    if (!existingUser) { return res.status(401).send({ msg: 'Provided user credentials are required.' }); }
    return next();
}



module.exports = {
    registerValidator,
    existingUser
}
