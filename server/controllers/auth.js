const db = require('../models/');
const { tokenVerify, createError } = require('../shared/helpers');
const { BAD_REQUEST, UNAUTHORIZED } = require('http-status-codes');

function login({ body: { email, password } }, res) {
  if (!email || !password) {
    return createError(BAD_REQUEST, 'Input query not filled');
  }
  return db.user.findOne({
    where: { email }
  })
    .then(user => user || createError(UNAUTHORIZED, 'Email & password combination not found'))
    .then(user => user.validatePassword(password))
    .then(user => user || createError(UNAUTHORIZED, 'Email & password combination not found'))
    .then(user => user.isAuthorized() ? user : createError(UNAUTHORIZED, 'Access denied'))
    .then(user => {
      const token = user.createToken({});
      const data = {
        id: user.id,
        email: email,
        role: user.role,
        team: user.teamId,
        token: token
      };
      res.send(data);
    });
}

function changePassword({ body: { password }, user }, res) {
  return user.update({ password })
    .then(pass => res.send(pass));
}

function forgotPassword({ body: { email } }, res) {
  return db.user.findOne({ where: { email } })
    .then(user => user || createError(BAD_REQUEST, 'User not found'))
    .then(user => user.sendResetToken())
    .then(() => res.end());
}

function resetPassword({ body: { token, password } }, res) {
  const error = tokenVerify(token);
  if (error) return createError(UNAUTHORIZED, 'Token expired');
  return db.user.findOne({ where: { token } })
    .then(user => user || createError(BAD_REQUEST, 'Invalid token'))
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
