const router = require('express').Router();
const { create, findOne, findById } = require('../controllers/user');
const { isAuthenticated } = require('../middleware');

router.post('/newUser', isAuthenticated(), create);

router.post('/users', isAuthenticated(), findOne);

router.post('/users/:id', isAuthenticated(), findById);

module.exports = router;
