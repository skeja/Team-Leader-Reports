const db = require('../models');

function list(req, res) {
  return db.office.findAll()
    .then(offices => res.send(offices));
}

module.exports = {
  list
};
