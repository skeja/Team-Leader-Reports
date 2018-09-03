const jwt = require('jsonwebtoken');

const db = require('../models/');

async function login({ body: { email, password } }, res) {
  if (!email || !password) {
    return res.status(400).jsend.error('Input query not filled');
  }
  await db.user.findOne({
    where: { email: email }
  }).then(async it => {
    if (it === null) return res.status(401).jsend.error('Email & password combination not found');
    const authenticated = await it.validatePassword(password);
    if (!authenticated) return res.status(401).jsend.error('Email & password combination not found');
    if (it.role === 'DEVELOPER') return res.status(401).jsend.error('Access denied');
    const payload = { id: it.id };
    const token = jwt.sign(payload, 'secret');
    const user = {
      id: it.id,
      email: email,
      role: it.role,
      token: token
    };
    res.send(user);
  });
}

function changePassword({ body: { password }, user }, res) {
  return user.update({ password })
    .then(pass => res.send(pass));
}

module.exports = {
  login,
  changePassword
};
