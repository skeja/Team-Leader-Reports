const auth = require('./auth');
const user = require('./user');
const report = require('./report');
const team = require('./team');

module.exports = app => {
  app.use('/api', auth);
  app.use('/api', user);
  app.use('/api', report);
  app.use('/api', team);
};
