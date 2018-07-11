const router = require('express-promise-router')();
const ctrl = require('../controllers/report');
const { isAuthenticated } = require('../middleware');

router.get('/reports', isAuthenticated(), ctrl.findBySubject);

router.get('/reports/users', isAuthenticated(), ctrl.getLastUsersReports);

router.get('/reports/team/users', isAuthenticated(), ctrl.findTeamUsersReports);

router.get('/reports/:userId', isAuthenticated(), ctrl.getUserReports);

router.get('/reports/:userId/:reportId', isAuthenticated(), ctrl.getReport);

router.post('/reports/:userId/newReport', isAuthenticated(), ctrl.create);

router.put('/reports/:reportId', isAuthenticated(), ctrl.update);

router.delete('/reports/:reportId', isAuthenticated(), ctrl.remove);

module.exports = router;
