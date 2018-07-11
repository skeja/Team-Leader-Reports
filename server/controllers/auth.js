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
      id: it.id,
      email: body.email,
      token: token
    };
    res.send(user);
  });
}

module.exports = {
  login
};
