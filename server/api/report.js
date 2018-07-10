const router = require('express-promise-router')();
const ctrl = require('../controllers/report');
const { isAuthenticated } = require('../middleware');

router.get('/reports', ctrl.findBySubject);

router.get('/reports/users', isAuthenticated(), ctrl.getLastUsersReports);

router.get('/reports/team/users', isAuthenticated(), ctrl.findTeamUsersReports);

router.get('/reports/:userId', ctrl.getUserReports);

router.get('/reports/:userId/:reportId', ctrl.getReport);

router.post('/reports/:userId/newReport', ctrl.create);

router.put('/reports/:reportId', ctrl.update);

router.delete('/reports/:reportId', ctrl.remove);

module.exports = router;
