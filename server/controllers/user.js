const omit = require('lodash/omit');
const db = require('../models');

async function create({ body }, res) {
  const user = await db.user.create(body);
  res.send(user);
}

async function findAll(req, res) {
  const users = await db.user.findAll({});
  let omitedUsers = [];
  users.map(it => {
    omitedUsers.push(omit(it.dataValues, 'password'));
  });
  res.send(omitedUsers);
}

async function findOne({ body }, res) {
  db.user.findAll({
    where: {
      $and: [ { firstName: { $ilike: `${body.firstName}%` } }, { lastName: { $ilike: `${body.lastName}%` } } ]
    }
  }).then(it => res.send(it))
    .catch(err => console.log(err));
}

async function findById({ body }, res) {
  db.user.findOne({
    where: { id: body.id }
  }).then(it => res.send(it));
}

async function update({ body }, res) {
  db.user.update(
    {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      role: body.role,
      office: body.office
    },
    { where: { id: body.id } }
  );
}

async function remove({ params }, res) {
  db.user.destroy(
    { where: { id: params.id } }
  );
}

module.exports = {
  create,
  findAll,
  findOne,
  findById,
  update,
  remove
};
