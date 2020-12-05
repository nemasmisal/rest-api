const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9000,
        db: 'mongodb+srv://xfce:niki654123@cluster0.ltcnh.azure.mongodb.net/phone-shop?retryWrites=true&w=majority',
        authCookieName: 'xfcEEcfx',
        authHeaderName: 'xfcEEcfx',
        saltRounds: 9,
        jwtSecret: 'Phone_JWT_Secret',
        adminId: '5fba3156c2beda1a5f0be4be'
    },
    production: {}
};

module.exports = config[env];