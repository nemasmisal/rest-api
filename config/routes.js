const userRouter = require('../routers/userRouter');
const articleRouter = require('../routers/articleRouter');
const orderRouter = require('../routers/orderRouter');
const authRouter = require('../routers/authRouter');
const pageNotFound = require('../controllers/pageNotFoundController');

module.exports = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/article', articleRouter);
  app.use('/api/admin', orderRouter);
  app.use('/api/auth', authRouter);
  app.all('*', pageNotFound);
};