const router = require('express-promise-router')();
const { login } = require('../controllers/auth');

router.post('/login', login);

module.exports = router;
