const db = require('../models');

function list(req, res) {
  return db.team.findAll()
    .then(teams => res.send(teams));
}

function create({ body }, res) {
  return db.team.create(body).then(user => res.send(user));
}

function getTeamUsers({ params: { teamId } }, res) {
  return db.user.findAll({
    where: { teamId },
    attributes: ['id', 'firstName', 'lastName'],
    include: [{
      model: db.office,
      attributes: ['name']
    }]
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

function addTeamMember({ params: { teamId }, body: { id } }, res) {
  return db.user.update({
    teamId: teamId
  }, { where: { id } })
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
