const router = require('express-promise-router')();
const { login, changePassword } = require('../controllers/auth');
const { isAuthenticated } = require('../middleware');

router.post('/login', login);

router.put('/changePassword', isAuthenticated(), changePassword);

module.exports = router;
