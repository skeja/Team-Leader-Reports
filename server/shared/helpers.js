const jwt = require('jsonwebtoken');
const SECRET_OR_KEY = process.env.SECRET_OR_KEY;

function tokenVerify(token) {
  return jwt.verify(token, SECRET_OR_KEY, (err, decoded) => {
    if (err) return err.message;
  });
}

module.exports = {
  tokenVerify
};
