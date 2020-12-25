const Article = require('../models/articleModel');

module.exports = {
    async createArticle(req, res, next) {
        try {
            const article = new Article(req.body);
            await article.save();
            return res.status(201).send(article);
        } catch (error) { return res.status(507).send({ msg: error }); }
    },
    async editArticle(req, res, next) {
        try {
            const articleId = req.params.id
            const article = await Article.findByIdAndUpdate(articleId, req.body);
            return res.status(202).send({ msg: 'Article successfully updated.', article });
        } catch (error) { return res.status(507).send(error); }
    },
    async getArticleByCategory(req, res, next) {
        try {
            const articleCategory = req.url.slice(1)
            const article = await Article.find({ category: articleCategory });
            return res.send(article);
        } catch (error) { return res.status(400).send({ msg: 'Article with provided ID do not exist.' }); }
    },
    async addLikeToArticle(req, res, next) {
        try {
            const { articleId } = req.body;
            const { userId } = req.user;
            await Article.findByIdAndUpdate(articleId, { $push: { likes: userId } })
            return res.status(202).send({ msg: 'Article successfully liked' });
        } catch (error) { return res.status(400).send({ msg: 'Article with provided ID do not exist.' }); }
    },
    async getArticleById(req, res, next) {
        try {
            const articleId = req.params.id
            const article = await Article.findById(articleId);
            return res.send(article);
        } catch (error) { return res.status(400).send({ msg: 'Article with provided ID do not exist.' }); }
    },
    async getAllArticles(req, res, next) {
        try {
            const articles = await Article.find({});
            return res.send(articles);
        } catch (error) { return res.status(507).send({ msg: error }); }
    },
    async removeArticle(req, res, next) {
        try {
            const articleId = req.params.id;
            await Article.findByIdAndDelete(articleId);
            return res.status(202).send({ msg: 'Article successfully deleted.'})
        } catch (error) { return res.status(400).send({ msg: 'Article with provided ID do not exist' }); }
    },
    async getNewestArticles(req, res, next) {
        try {
            const phone = await Article.findOne({ category: 'phones' }).sort({ created_at: -1 }).lean();
            const phoneCase = await Article.findOne({ category: 'cases' }).sort({ created_at: -1 }).lean();
            const screenProtector = await Article.findOne({ category: 'screenProtectors' }).sort({ created_at: -1 }).lean();
            const accessory = await Article.findOne({ category: 'accessories' }).sort({ created_at: -1 }).lean();
            res.send({ phone, case: phoneCase, screenProtector, accessory });
        } catch (error) { res.status(507).send({ msg: error }); }
    }
}