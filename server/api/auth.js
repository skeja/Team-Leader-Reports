const router = require('express').Router();
const { login, findOne, findById } = require('../controllers/auth');
const { isAuthenticated } = require('../middleware');

router.post('/login', login);

router.post('/users', isAuthenticated(), findOne);

router.post('/users/:id', isAuthenticated(), findById);

module.exports = router;
