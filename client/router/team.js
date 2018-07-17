import Teams from '../components/teams/Teams.vue';
import TeamList from '../components/teams/TeamList.vue';

export default {
  path: '/teams',
  component: Teams,
  children: [{
    path: '',
    component: TeamList
  }]
};
