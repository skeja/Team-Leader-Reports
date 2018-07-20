<template>
  <div class="main">
    <sidebar :routes="userRoutes"></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '../navigation/Sidebar.vue';
import UserStore from '../../store';

const generalRoutes = [{
  to: '/users',
  label: 'Find User'
}];

const adminRoutes = [{
  to: { name: 'newUser' },
  label: 'Create User'
}];

export default {
  components: { Sidebar },
  computed: {
    userRoutes() {
      const { role } = UserStore.state.currentUser;
      let routes = [...generalRoutes];
      if (role !== 'TEAM_LEAD') routes.push(...adminRoutes);
      return routes;
    }
  }
};
</script>
