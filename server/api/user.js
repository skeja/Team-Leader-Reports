const router = require('express').Router();
const { create, findOne, findById, update, findAll } = require('../controllers/user');
const { isAuthenticated } = require('../middleware');

router.post('/newUser', isAuthenticated(), create);

router.put('/users/:id', isAuthenticated(), update);

router.get('/users', findAll);

router.post('/users', isAuthenticated(), findOne);

router.post('/users/:id', isAuthenticated(), findById);

module.exports = router;
