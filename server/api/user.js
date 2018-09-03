const router = require('express-promise-router')();
const ctrl = require('../controllers/user');
const { isAuthenticated } = require('../middleware');

router.use('/users*', isAuthenticated());

router.get('/users', ctrl.findAll);

router.post('/users', ctrl.create);

router.get('/users/:id', ctrl.findById);

router.put('/users/:id', ctrl.update);

router.delete('/users/:id', ctrl.remove);

module.exports = router;
