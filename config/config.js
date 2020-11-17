const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9000,
        db: 'mongodb+srv://xfce:niki654123@cluster0.ltcnh.azure.mongodb.net/phone-shop?retryWrites=true&w=majority',
        saltRounds: 9,
        jwtSecret: 'Phone_JWT_Secret'
    },
    production: {}
};

module.exports = config[env];