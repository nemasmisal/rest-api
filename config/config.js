const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9000,
        db: '',
        authCookieName: '',
        authHeaderName: '',
        saltRounds: 9,
        jwtSecret: ''
    },
    production: {}
};

module.exports = config[env];