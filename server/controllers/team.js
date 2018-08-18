const db = require('../models');

function list(req, res) {
  return db.team.findAll()
    .then(teams => res.send(teams));
}

function create({ body }, res) {
  return db.team.create(body).then(user => res.send(user));
}

function getTeamUsers({ params: { id } }, res) {
  return db.user.findAll({
    where: { team: id },
    attributes: ['id', 'firstName', 'lastName', 'office']
  })
    .then(users => res.send(users));
}

function getTeam({ params: { id } }, res) {
  return db.team.findOne({
    where: { id }
  })
    .then(team => res.send(team));
}

function remove({ params: { id } }, res) {
  return db.team.destroy({
    where: { id }
  })
    .then(() => res.status(204).send())
    .then(db.user.update({
      team: null
    }, { where: { team: id } }
    ))
    .then(user => res.send(user));
}

function addTeamMember({ params: { id, userId } }, res) {
  return db.user.update({
    team: id
  }, { where: { id: userId } })
    .then(user => res.send(user));
}

module.exports = {
  list,
  create,
  getTeamUsers,
  getTeam,
  remove,
  addTeamMember
};
