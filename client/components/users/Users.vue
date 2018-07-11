<template>
  <div>
    <sidebar :routes="userRoutes"></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '../navigation/Sidebar.vue';
export default {
  components: { Sidebar },
  data() {
    return {
      userRoutes: [{
        to: '/users',
        label: 'Find User'
      }, {
        to: '/users/newUser',
        label: 'Create User'
      }, {
        to: '/users/updateUser',
        label: 'Update User'
      }]
    };
  }
};
</script>
