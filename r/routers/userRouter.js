const router = require('express').Router();
const userController = require('../controllers/userController');
const isAdmin = require('../middlewares/adminValidator');
const { existingUser } = require('../middlewares/userValidator');

router.get('/favorites', userController.getFavorites);
router.post('/favorites/add',existingUser, userController.addToFavorites);
router.post('/favorites/remove',existingUser, userController.removeFromFavorites);
router.get('/basket',existingUser, userController.getBasket);
router.post('/basket/add',existingUser, userController.addToBasket);
router.post('/basket/remove',existingUser, userController.removeFromBasket);
router.get('/profile/:id',existingUser, userController.getProfile);
router.get('/order',existingUser, userController.placeOrder);
router.get('/all', userController.getUsers);
router.post('/update',isAdmin, userController.updateUser);

module.exports = router;