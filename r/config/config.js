const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9000,
        db: 'mongodb://localhost:27017/phone-shop?retryWrites=true&w=majority',
        authCookieName: 'xfcEEcfx',
        authHeaderName: 'xfcEEcfx',
        saltRounds: 9,
        jwtSecret: 'Phone_JWT_Secret'
    },
    production: {}
};

module.exports = config[env];
