const db = require('../models');
const omit = require('lodash/omit');

function create({ body }, res) {
  return db.user.create(body).then(user => res.send(user));
}

function findAll({ user: { role, team }, query: { search } }, res) {
  const query = {
    where: {}
  };
  if (search) query.where = { $or: [{ firstName: { $ilike: `${search}%` } }, { lastName: { $ilike: `${search}%` } }] };

  if (role !== 'ADMIN') {
    Object.assign(query.where, { team });
  }
  return db.user.findAll(query)
    .then(users => users.map(it => omit(it.dataValues, 'password')))
    .then(users => res.send(users));
}

function findById({ params: { id } }, res) {
  return db.user.findOne({
    where: { id },
    attributes: { exclude: ['password']
    }
  })
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
  ).then(it => res.status(200).send());
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove
};
