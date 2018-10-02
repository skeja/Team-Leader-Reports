const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://@localhost:5432/tlreports');

const db = { Sequelize, sequelize };

const models = ['office', 'project', 'report', 'team', 'teamHistory', 'user', 'projectHistory'];

models.forEach(it => {
  db[it] = db.sequelize.import(`./${it}`);
});

Object.keys(db).forEach(it => {
  db[it].associate && db[it].associate(db);
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected successfully');
  })
  .catch(err => {
    console.log('Unable to connect:', err);
  });

module.exports = db;
