<template>
  <div class="main">
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
          to: { name: 'findReports' },
          label: 'Find Reports'
        }, {
          to: { name: 'addReport' },
          label: 'New Report'
        }]
    };
  }
};
</script>
