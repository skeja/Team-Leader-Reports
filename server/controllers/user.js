const db = require('../models');

async function create({ body }, res) {
  const user = await db.user.create(body);
  res.send(user);
}

async function findOne({ body }, res) {
  db.user.findAll({
    where: {
      $and: [ { firstName: { $like: `${body.firstName}%` } }, { lastName: { $like: `${body.lastName}%` } } ]
    }
  }).then(it => res.send(it))
    .catch(err => console.log(err));
}

async function findById({ body }, res) {
  db.user.findOne({
    where: { id: body.id }
  }).then(it => res.send(it));
}

module.exports = {
  create,
  findOne,
  findById
};
