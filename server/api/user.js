const router = require('express-promise-router')();
const ctrl = require('../controllers/user');
const { isAuthenticated } = require('../middleware');

router.post('/newUser', isAuthenticated(), ctrl.create);

router.put('/users/:id', isAuthenticated(), ctrl.update);

router.get('/users', isAuthenticated(), ctrl.findAll);

router.post('/users', isAuthenticated(), ctrl.findOne);

router.get('/users/:id', isAuthenticated(), ctrl.findById);

router.delete('/users/:id', isAuthenticated(), ctrl.remove);

module.exports = router;
