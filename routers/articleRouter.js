const router = require('express').Router();
const articleController = require('../controllers/articleController');
const article = require('../middlewares/articleValidator');
const { existingUser } = require('../middlewares/userValidator');
const checkForErrors = require('../middlewares/checkForErrors');
const isAdmin = require('../middlewares/adminValidator');

router.post('/create', existingUser,
  isAdmin,
  article.nameValidator,
  article.categoryValidator,
  article.priceValidator,
  article.quantityValidator,
  article.desctriptionValidator,
  article.imageURLValidator,
  checkForErrors,
  articleController.createArticle);
router.get('/all', articleController.getAllArticles);
router.get('/phones', articleController.getArticleByCategory);
router.get('/cases', articleController.getArticleByCategory);
router.get('/accessories', articleController.getArticleByCategory);
router.get('/screenProtectors', articleController.getArticleByCategory);
router.get('/newest', articleController.getNewestArticles);
router.get('/:id', articleController.getArticleById);
router.post('/like', existingUser, articleController.addLikeToArticle);
router.post('/edit/:id',
  isAdmin,
  article.nameValidator,
  article.categoryValidator,
  article.priceValidator,
  article.quantityValidator,
  article.desctriptionValidator,
  article.imageURLValidator,
  checkForErrors,
  existingUser, articleController.editArticle);
router.delete('/remove/:id', isAdmin, articleController.removeArticle);

module.exports = router;