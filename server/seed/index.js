const db = require('../models');

const userData = require('./users.json').data;
const teamData = require('./teams.json').data;
const projectData = require('./projects.json').data;
const projectHistoryData = require('./projectHistory.json').data;
const reports = require('./reports.json').data;
const teamHistoryData = require('./teamHistory.json').data;
const officeData = require('./office.json').data;

db.sequelize.sync({ force: true })
  .then(() => seed())
  .then(() => {
    console.log('/////////////////////////////////Seed ended');
    process.exit(0);
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });

async function seed() {
  let models = {};

  models.team = await createObj(db.team, teamData);
  models.office = await createObj(db.office, officeData);
  models.user = await createObj(db.user, userData);
  models.project = await createObj(db.project, projectData);
  models.projectHistory = await createObj(db.projectHistory, projectHistoryData);
  models.reports = await createObj(db.report, reports);
  models.teamHistory = await createObj(db.teamHistory, teamHistoryData);
};

function createObj(db, data) {
  const arr = [];
  for (let value of data) {
    arr.push(db.create(value));
  }
  return Promise.all(arr);
}
