const db = require('../models');

const userData = require('./users.json').data;
const teamData = require('./teams.json').data;
const projectData = require('./projects.json').data;
const projectHistoryData = require('./projectHistory.json').data;
const reports = require('./reports.json').data;
const teamHistoryData = require('./teamHistory.json').data;

async function seedDb() {
  await db.sequelize.sync({ force: true });
  await seed();
  console.log('/////////////////////////////////Seed ended');
};

seedDb();

async function seed() {
  let models = {};

  models.user = await createObj(db.user, userData);
  models.team = await createObj(db.team, teamData);
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
