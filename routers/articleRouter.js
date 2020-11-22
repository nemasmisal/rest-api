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
router.get('/:id', articleController.getArticleById);
router.post('/edit/:id', existingUser, isCreator, articleController.editArticle);
router.delete('/remove/:id', existingUser, isCreator, articleController.removeArticle);

// router.get('/cases', articleController.getCases);
// router.get('/accessories', articleController.getAccessories);
// router.get('/screenProtectors', articleController.getScreenProtectors);
module.exports = router