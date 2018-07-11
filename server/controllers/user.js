const db = require('../models');
const omit = require('lodash/omit');

function create({ body }, res) {
  return db.user.create(body).then(user => res.send(user));
}

function findAll({ user: { role, team } }, res) {
  const query = {};
  if (role !== 'ADMIN') {
    query.where = { team };
  }
  return db.user.findAll(query)
    .then(users => users.map(it => omit(it.dataValues, 'password')))
    .then(users => res.send(users));
}

function findOne({ body: { firstName, lastName } }, res) {
  const where = {
    $and: [{ firstName: { $ilike: `${firstName}%` } }, { lastName: { $ilike: `${lastName}%` } }]
  };
  return db.user.findAll({ where }).then(user => res.send(user));
}

function findById({ params: { id } }, res) {
  return db.user.findOne({ where: { id } })
    .then(it => res.send(it));
}

function update({ body }, res) {
  return db.user.update({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    role: body.role,
    office: body.office
  }, { where: { id: body.id } })
    .then(user => res.send(user));
}

function remove({ params }, res) {
  return db.user.destroy(
    { where: { id: params.id } }
  ).then(it => res.send(it));
}

module.exports = {
  create,
  findAll,
  findOne,
  findById,
  update,
  remove
};
