const jwt = require('jsonwebtoken');
const httpError = require('http-errors');

const SECRET_OR_KEY = process.env.SECRET_OR_KEY;

function tokenVerify(token) {
  return jwt.verify(token, SECRET_OR_KEY, (err, decoded) => {
    if (err) return err.message;
  });
}

function createError(httpCode = 400, message = '') {
  return Promise.reject(httpError(httpCode, message));
};

module.exports = {
  tokenVerify,
  createError
};
