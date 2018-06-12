const router = require('express').Router();
const { login } = require('../controllers/auth');
const { isAuthenticated } = require('../middleware');

router.post('/login', isAuthenticated(), login);

module.exports = router;
