const router = require('express-promise-router')();
const ctrl = require('../controllers/team');
const { isAuthenticated } = require('../middleware');

router.get('/teams',isAuthenticated(), ctrl.list);

module.exports = router;
