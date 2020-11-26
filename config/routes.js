const userRouter = require('../routers/userRouter');
const articleRouter = require('../routers/articleRouter');
const orderRouter = require('../routers/orderRouter');
const pageNotFound = require('../controllers/pageNotFoundController');

module.exports = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/article', articleRouter);
  app.use('/api/admin', orderRouter);
  app.all('*', pageNotFound);
};