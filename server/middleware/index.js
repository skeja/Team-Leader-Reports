const passport = require('../auth');

function isAuthenticated() {
  return passport.authenticate('jwt', { session: false });
}

module.exports = {
  isAuthenticated
};
