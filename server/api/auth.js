const router = require('express-promise-router')();
const ctrl = require('../controllers/auth');
const { isAuthenticated } = require('../middleware');

router.post('/login', ctrl.login);

router.put('/changePassword', isAuthenticated(), ctrl.changePassword);

router.post('/forgotPassword', ctrl.forgotPassword);

router.post('/resetPassword', ctrl.resetPassword);

module.exports = router;
