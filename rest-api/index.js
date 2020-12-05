const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('express')();
const globalErrorHandler = require('./controllers/globalErrorHandler');

require('./config/express')(app);
require('./config/routes')(app);

mongoose.connect(config.db, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) { return console.log(err); }
  app.use(globalErrorHandler);
  app.listen(config.port, console.log(`Listening on port ${config.port}! Connected to DB!`));
})
