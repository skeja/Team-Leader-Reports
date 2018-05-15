const db = require('../models');
const faker = require('faker');

async function seedDb() {
  await db.sequelize.sync({ force: true });
  await seed();
  console.log('/////////////////////////////////Seed ended');
};

seedDb();

async function seed() {
  const models = {};

  models.project = await createObj(db.project, 5, createProject, models);
  models.team = await createObj(db.team, 5, createTeam, models);
  models.user = await createObj(db.user, 20, createUser, models);
  models.report = await createObj(db.report, 20, createReport, models);
  models.projectHistory = await createObj(db.projectHistory, 25, createProjectHistory, models);
  models.teamHistory = await createObj(db.teamHistory, 10, createTeamHistory, models);
};

async function createObj(db, num, fun, models) {
  let array = [];
  for (let i = 0; i < num; i++) {
    array.push(db.create(fun(models)));
  }
  return Promise.all(array);
}

function createProject() {
  return {
    name: faker.random.word(),
    description: faker.lorem.text(),
    startDate: faker.date.past(),
    endDate: faker.date.future()
  };
}

function rndNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createTeam() {
  return {
    name: faker.random.word()
  };
}

function createUser() {
  const roles = ['ADMIN', 'TEAM_LEAD', 'DEVELOPER'];
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.random.word(),
    role: roles[rndNumber(0, roles.length - 1)],
    office: faker.random.word().toUpperCase().slice(-1) + faker.random.number(20)
  };
}

function createReport(models) {
  return {
    content: faker.lorem.text(),
    reporterId: models.user[rndNumber(0, models.user.length - 1)].id,
    subjectId: models.user[rndNumber(0, models.user.length - 1)].id
  };
}

function createProjectHistory(models) {
  return {
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    projectId: models.project[rndNumber(0, models.project.length - 1)].id,
    userId: models.user[rndNumber(0, models.user.length - 1)].id
  };
}

function createTeamHistory(models) {
  return {
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    teamId: models.team[rndNumber(0, models.team.length - 1)].id,
    userId: models.user[rndNumber(0, models.user.length - 1)].id
  };
}
