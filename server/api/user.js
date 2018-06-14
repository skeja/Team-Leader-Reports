const router = require('express').Router();
const ctrl = require('../controllers/user');
const { isAuthenticated } = require('../middleware');

router.post('/newUser', isAuthenticated(), ctrl.create);

router.put('/users/:id', isAuthenticated(), ctrl.update);

router.get('/users', ctrl.findAll);

router.post('/users', isAuthenticated(), ctrl.findOne);

router.post('/users/:id', isAuthenticated(), ctrl.findById);

router.delete('/users/:id', isAuthenticated(), ctrl.remove);

module.exports = router;
