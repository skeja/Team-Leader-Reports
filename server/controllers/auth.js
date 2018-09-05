const db = require('../models/');
const { tokenVerify } = require('../shared/helpers');

async function login({ body: { email, password } }, res) {
  if (!email || !password) {
    return res.status(400).jsend.error('Input query not filled');
  }
  await db.user.findOne({
    where: { email }
  }).then(async it => {
    if (it === null) return res.status(401).jsend.error('Email & password combination not found');
    const authenticated = await it.validatePassword(password);
    if (!authenticated) return res.status(401).jsend.error('Email & password combination not found');
    if (it.role === 'DEVELOPER') return res.status(401).jsend.error('Access denied');
    const token = it.createToken({});
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

function forgotPassword({ body: { email } }, res) {
  return db.user.findOne({ where: { email } })
    .then(user => user || Promise.reject(new Error('User not found')))
    .then(user => user.sendResetToken())
    .then(() => res.end());
}

function resetPassword({ body: { token, password } }, res) {
  const error = tokenVerify(token);
  if (error) return Promise.reject(new Error(error));
  return db.user.findOne({ where: { token } })
    .then(user => user || Promise.reject(new Error('Invalid token')))
    .then(user => {
      user.password = password;
      user.save();
    });
}

module.exports = {
  login,
  changePassword,
  forgotPassword,
  resetPassword
};
