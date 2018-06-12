const auth = require('./auth');
const user = require('./user');

module.exports = app => {
  app.use('/api', auth);
  app.use('/api', user);
};
