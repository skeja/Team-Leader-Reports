import index from '../components/teams/index';
import Create from '../components/teams/Create';
import Team from '../components/teams/Team';

export default [
  {
    path: '/teams',
    component: index,
    name: 'teamList'
  }, {
    path: '/teams/new',
    component: Create,
    name: 'newTeam'
  }, {
    path: '/teams/:id',
    component: Team,
    name: 'team'
  }
];
