<template>
  <div>
    <sidebar :routes="reportsRoutes"></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from '../navigation/Sidebar.vue';

export default {
  components: { Sidebar },
  data() {
    return {
      reportsRoutes: [
        {
          to: '/reports',
          label: 'Find Reports'
        }, {
          to: '/reports/new',
          label: 'New Report'
        }]
    };
  }
};
</script>
