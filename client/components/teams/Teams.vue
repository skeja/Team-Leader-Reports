<template>
  <div>
    <sidebar :routes="teamRoutes"></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '../navigation/Sidebar.vue';
import UserStore from '../../store';

const generalRoutes = [{
  to: '/teams',
  label: 'Team list'
}];

const adminRoutes = [{ }];

export default {
  components: { Sidebar },
  computed: {
    teamRoutes() {
      const { role } = UserStore.state.currentUser;
      let routes = [...generalRoutes];
      if (role !== 'TEAM_LEAD') routes.push(...adminRoutes);
      return routes;
    }
  }
};
</script>
