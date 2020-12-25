const router = require('express').Router();
const authController = require('../controllers/authController');
const { passwordValidator, usernameValidator } = require('../middlewares/userValidator');
const checkForErrors = require('../middlewares/checkForErrors');

router.post('/register', usernameValidator, passwordValidator, checkForErrors, authController.postRegister);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);
router.get('/checkAuth', authController.checkAuth);

module.exports = router;