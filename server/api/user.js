const router = require('express-promise-router')();
const ctrl = require('../controllers/user');
const { isAuthenticated } = require('../middleware');

router.get('/users', isAuthenticated(), ctrl.findAll);

router.post('/users', isAuthenticated(), ctrl.create);

router.get('/users/:id', isAuthenticated(), ctrl.findById);

router.put('/users/:id', isAuthenticated(), ctrl.update);

router.delete('/users/:id', isAuthenticated(), ctrl.remove);

module.exports = router;
