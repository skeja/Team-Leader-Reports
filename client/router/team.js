import Teams from '../components/teams/Teams.vue';
import TeamList from '../components/teams/TeamList.vue';
import NewTeam from '../components/teams/NewTeam.vue';
import Team from '../components/teams/Team.vue';
import AddUsers from '../components/teams/AddUsers.vue';

export default {
  path: '/teams',
  component: Teams,
  children: [{
    path: '',
    component: TeamList
  }, {
    path: 'new',
    component: NewTeam,
    name: 'newTeam'
  }, {
    path: 'add-users',
    component: AddUsers,
    name: 'addUsers'
  }, {
    path: ':id',
    component: Team,
    name: 'team'
  }]
};
