const Article = require('../models/articleModel');

module.exports = {
    async createArticle(req, res, next) {
        const { title, userId } = req.body;
        const article = new Article({ title, creator: userId });
        await article.save((err, doc) => {
            if (err) { return res.status(507).send('The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.') }
            return res.status(201).send(doc);
        })
    },
    async editArticle(req, res, next) {
        const articleId = req.params.id
        await Article.findByIdAndUpdate(articleId, req.body, (err, doc) => {
            if (err) { return res.status(507).send('The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.') }
            return res.status(202).send({ msg: 'Article successfully updated.', doc });
        })
    },
    async getArticleById(req, res, next) {
        const articleId = req.params.id
        await Article.findById(articleId, (err, doc) => {
            if (err) { return res.status(400).send({ msg: 'Article with provided ID do not exist.' }) }
            return res.send(doc);
        });
    },
    async getAllArticles(req, res, next) {
        await Article.find({}, (err, articles) => {
            if (err) { return res.status(507).send('The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.') }
            return res.send(articles);
        });
    },
    async removeArticle(req, res, next) {
        const articleId = req.params.id;
        await Article.findByIdAndDelete(articleId, (err, doc) => {
            if (err) { return res.status(400).send({ msg: 'Article with provided ID do not exist' }) }
            return res.status(202).send({ msg: 'Article successfully deleted.', doc })
        });
    }
}