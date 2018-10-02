const router = require('express-promise-router')();
const ctrl = require('../controllers/team');
const { isAuthenticated } = require('../middleware');

router.get('/teams', isAuthenticated(), ctrl.list);

router.post('/teams', isAuthenticated(), ctrl.create);

router.put('/teams/:teamId/', isAuthenticated(), ctrl.addTeamMember);

router.get('/teams/:teamId/users', isAuthenticated(), ctrl.getTeamUsers);

router.get('/teams/:id', isAuthenticated(), ctrl.getTeam);

router.delete('/teams/:id', isAuthenticated(), ctrl.remove);

module.exports = router;
