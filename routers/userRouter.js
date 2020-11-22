const router = require('express').Router();
const userController = require('../controllers/userController');
const { registerValidator } = require('../middlewares/userValidator');

router.post('/register', registerValidator, userController.postRegister);
router.post('/login', userController.postLogin);
router.get('/logout', userController.getLogout);

module.exports = router;