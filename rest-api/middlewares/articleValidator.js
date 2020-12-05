const Article = require('../models/articleModel');

const inputReqs = {
    titleLength: 4
}

async function articleValidator(req, res, next) {
    const { title } = req.body;
    if (title.length < inputReqs.titleLength) { return res.status(400).send({ msg: `Title length must be at least ${inputReqs.titleLength} symbols` }); }
    const existingArticle = await Article.exists({ title });
    if (existingArticle) { return res.status(409).send({ msg: 'This article is already exist, please create different one or join the existing one' }); }
    return next();
}

async function isCreator(req, res, next) {
    const { userId } = req.user;
    const articleId = req.params.id
    if (!userId || !articleId) { return res.status(401).send({ msg: 'Providing credentials is required.' }); }
    await Article.findById(articleId, (err, article) => {
        if (err) {
            return res.status(404).send({ msg: 'Article with provided ID do not exist' });
        }
        if (article.creator.toString() !== userId) { return res.status(401).send({ msg: "Only creator of the article can modify it." }); }
        return next();
    });
}

module.exports = {
    articleValidator,
    isCreator
}
