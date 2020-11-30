const router = require('express').Router();
const articleController = require('../controllers/articleController');
const { isCreator, articleValidator } = require('../middlewares/articleValidator');
const { existingUser } = require('../middlewares/userValidator');

router.post('/create', articleController.createArticle);
router.get('/all', articleController.getAllArticles);
router.get('/phones', articleController.getArticleByCategory);
router.get('/cases', articleController.getArticleByCategory);
router.get('/accessories', articleController.getArticleByCategory);
router.get('/screenProtectors', articleController.getArticleByCategory);
router.get('/newest', articleController.getNewestArticles);
router.get('/:id', articleController.getArticleById);
router.post('/like', articleController.addLikeToArticle);
router.post('/edit/:id', existingUser, isCreator, articleController.editArticle);
router.delete('/remove/:id', articleController.removeArticle);
module.exports = router