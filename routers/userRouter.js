const router = require('express').Router();
const userController = require('../controllers/userController');
const checkForErrors = require('../middlewares/checkForErrors');
const { passwordValidator, usernameValidator } = require('../middlewares/userValidator');

router.post('/register', usernameValidator, passwordValidator, checkForErrors, userController.postRegister);
router.post('/login', userController.postLogin);
router.get('/logout', userController.getLogout);
router.get('/favorites', userController.getFavorites);
router.post('/favorites/add', userController.addToFavorites);
router.post('/favorites/remove', userController.removeFromFavorites);
router.get('/basket', userController.getBasket);
router.post('/basket/add', userController.addToBasket);
router.post('/basket/remove', userController.removeFromBasket);
router.get('/profile/:id', userController.getProfile);
router.get('/order', userController.placeOrder);
router.get('/all', userController.getUsers);
router.post('/update', userController.updateUser);
router.get('/checkAuth', userController.checkAuth);

module.exports = router;