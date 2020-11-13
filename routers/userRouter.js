const router = require('express').Router();
const userController = require('../controllers/userController');
const { registerValidator } = require('../middlewares/userValidator');

router.post('/register', registerValidator, userController.postRegister);

module.exports = router;