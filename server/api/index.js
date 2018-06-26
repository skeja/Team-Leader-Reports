const auth = require('./auth');
const user = require('./user');
const report = require('./report');

module.exports = app => {
  app.use('/api', auth);
  app.use('/api', user);
  app.use('/api', report);
};
