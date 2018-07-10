const db = require('../models');
const { keyBy } = require('lodash');

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

function getLastUsersReports({ user: { role, team } }, res) {
  const query = {
    attributes: [
      db.sequelize.literal('DISTINCT ON("report"."subject_id") 1'),
      'id', 'createdAt'
    ],
    order: [['subject_id', 'asc'], ['createdAt', 'desc']],
    include: [{
      as: 'subject',
      model: db.user,
      attributes: ['id', 'firstName', 'lastName', 'office'],
      required: true
    }]
  };

  if (role !== 'ADMIN') {
    const [userJoin] = query.include;
    userJoin.where = { team };
  }

  return db.report.findAll(query)
    .then(reports => {
      const users = [];
      reports.forEach(({ id, createdAt, subject }) => {
        const report = {
          id,
          createdAt
        };
        const user = {
          id: subject.id,
          firstName: subject.firstName,
          lastName: subject.lastName,
          office: subject.office,
          report
        };
        users.push(user);
      });
      res.send(users);
    });
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

async function findTeamUsersReports({ user: { role, team } }, res) {
  let users = await db.user.findAll({
    attributes: ['id', 'firstName', 'lastName', 'office'],
    where: { team },
    raw: true
  });
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
  users = users.map(user => {
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
