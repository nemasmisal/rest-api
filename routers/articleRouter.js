const router = require('express').Router();
const articleController = require('../controllers/articleController');
const { isCreator, articleValidator } = require('../middlewares/articleValidator');
const { existingUser } = require('../middlewares/userValidator');

router.post('/create',existingUser, articleController.createArticle);
router.get('/all', articleController.getAllArticles);
router.get('/phones', articleController.getArticleByCategory);
router.get('/cases', articleController.getArticleByCategory);
router.get('/accessories', articleController.getArticleByCategory);
router.get('/screenProtectors', articleController.getArticleByCategory);
router.get('/newest', articleController.getNewestArticles);
router.get('/:id', articleController.getArticleById);
router.post('/like',existingUser, articleController.addLikeToArticle);
router.post('/edit/:id', existingUser, articleController.editArticle);
router.delete('/remove/:id',existingUser, articleController.removeArticle);
module.exports = router