const db = require('../models');
const keyBy = require('lodash/keyBy');

function findBySubject({ query: { id } }, res) {
  return db.report.findAll({
    where: { subjectId: id },
    include: [
      {
        as: 'reporter',
        model: db.user
      }
    ]
  })
    .then(reports => res.send(reports));
}

function getLastUsersReports({ user: { role, teamId } }, res) {
  const include = [{
    as: 'subject',
    model: db.user,
    attributes: ['id', 'firstName', 'lastName'],
    required: true,
    include: [{
      model: db.office,
      attributes: ['name']
    }]
  }];

  if (role !== 'ADMIN') include[0].where = { teamId };

  const query = {
    attributes: [
      db.sequelize.literal('DISTINCT ON("report"."subject_id") 1'),
      'id', 'createdAt'
    ],
    order: [['subject_id', 'asc'], ['createdAt', 'desc']],
    include
  };

  return db.report.findAll(query)
    .map(report => report.toJSON())
    .map(({ subject, ...report }) => ({ report, ...subject }))
    .then(users => res.send(users));
}

function getUserReports({ params: { userId } }, res) {
  return db.report.findAll({
    where: { subjectId: userId },
    attributes: ['id', 'createdAt', 'updatedAt'],
    include: [{
      as: 'reporter',
      model: db.user,
      attributes: ['firstName', 'lastName']
    }]
  })
    .then(reports => res.send(reports));
}

function getReport({ params: { reportId } }, res) {
  return db.report.findOne({
    where: { id: reportId },
    attributes: { exclude: ['subjectId', 'reporterId'] },
    include: [{
      as: 'reporter',
      model: db.user,
      attributes: ['firstName', 'lastName']
    }]
  })
    .then(report => res.send(report));
}

function create({ body }, res) {
  return db.report.create(body).then(user => res.send(user));
}

function update({ body }, res) {
  return db.report.update({
    content: body.content,
    reporterId: body.reporterId,
    subjectId: body.subjectId
  }, { where: { id: body.id } })
    .then(report => res.send(report));
}

function remove({ params: { reportId } }, res) {
  return db.report.destroy({
    where: { id: reportId }
  })
    .then(() => res.status(204).send());
}

async function findTeamUsersReports({ user: { role, teamId } }, res) {
  const query = {
    attributes: ['id', 'firstName', 'lastName'],
    include: [{
      model: db.office,
      attributes: ['name']
    }]
  };
  if (role !== 'ADMIN') query.where = { teamId };

  let users = await db.user.findAll(query);

  const userIds = users.map(({ id }) => id);

  let reports = await db.report.findAll({
    attributes: [
      db.sequelize.literal('DISTINCT ON("report"."subject_id") 1'),
      'id', 'subjectId', 'createdAt'
    ],
    where: { subjectId: userIds },
    order: [['subject_id', 'asc'], ['createdAt', 'desc']],
    raw: true
  });
  reports = keyBy(reports, 'subjectId');
  users = users.map(user => user.toJSON())
    .map(user => {
      user.report = reports[user.id];
      return user;
    });
  res.send(users);
}

module.exports = {
  findBySubject,
  getLastUsersReports,
  getUserReports,
  getReport,
  create,
  update,
  remove,
  findTeamUsersReports
};
