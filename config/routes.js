const userRouter = require('../routers/userRouter');
const courseRouter = require('../routers/courseRouter')
const pageNotFound = require('../controllers/pageNotFoundController');

module.exports = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/course', courseRouter);
  app.all('*', pageNotFound);
};