const router = require('express').Router();
const userController = require('../controllers/userController');
const { registerValidator } = require('../middlewares/userValidator');

router.post('/register', registerValidator, userController.postRegister);
router.post('/login', userController.postLogin);
router.get('/logout', userController.getLogout);
router.post('/favorites/add', userController.addToFavorites);
router.post('/basket/add', userController.addToBasket);
router.post('/basket/remove', userController.removeFromBasket);
router.get('/profile/:id', userController.getProfile);
router.get('/order', userController.placeOrder);

module.exports = router;