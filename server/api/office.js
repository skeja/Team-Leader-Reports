const router = require('express-promise-router')();
const ctrl = require('../controllers/office');
const { isAuthenticated } = require('../middleware');

router.get('/offices', isAuthenticated(), ctrl.list);

module.exports = router;
