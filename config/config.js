const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9000,
        db: '',
        saltRounds: 1,
        jwtSecret: ''
    },
    production: {}
};

module.exports = config[env];