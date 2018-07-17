const db = require('../models');

function list(req, res) {
  return db.team.findAll()
    .then(teams => res.send(teams));
}

module.exports = {
  list
};
