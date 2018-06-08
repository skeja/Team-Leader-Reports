const jwt = require('jsonwebtoken');

const db = require('../models/');

async function login({ body }, res) {
  if (!body.email || !body.password) {
    return res.send('Input query not filled');
  }
  await db.user.findOne({
    where: { email: body.email }
  }).then(async it => {
    if (it === null) return res.send('Email & password combination not found');
    const authenticated = await it.validatePassword(body.password);
    if (!authenticated) return res.send('Email & password combination not found');
    const payload = { id: it.id };
    const token = jwt.sign(payload, 'secret');
    const user = {
      email: body.email,
      token: token
    };
    res.send(user);
  })
    .catch(err => console.log(err));
}

async function findOne({ body }, res) {
  db.user.findAll({
    where: {
      $and: [ { firstName: { $like: `${body.firstName}%` } }, { lastName: { $like: `${body.lastName}%` } } ]
    }
  }).then(it => res.send(it))
    .catch(err => console.log(err));
}

async function findById({ body }, res) {
  db.user.findOne({
    where: { id: body.id }
  }).then(it => res.send(it));
}

module.exports = {
  login,
  findOne,
  findById
};
