import index from '../components/teams/index';
import Create from '../components/teams/Create';
import Team from '../components/teams/Team';

import UserStore from '../store';

export default [
  {
    path: '/teams',
    component: index,
    name: 'teamList',
    beforeEnter: (to, from, next) => {
      const { currentUser: { role, team } = {} } = UserStore.state;
      if (role === 'ADMIN') return next();
      return next({ name: 'team', params: { id: team } });
    }
  }, {
    path: '/teams/new',
    component: Create,
    name: 'newTeam',
    meta: { role: 'ADMIN' }
  }, {
    path: '/teams/:id',
    component: Team,
    name: 'team'
  }
];
