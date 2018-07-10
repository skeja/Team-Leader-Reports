<template>
  <div class="container">
    <div class="center">
      <user-list :users="users" @selected="selected($event)"></user-list>
    </div>
  </div>
</template>

<script>
import UserList from './UserList.vue';
import axios from '../../axios-auth';
export default {
  components: {
    UserList
  },
  data() {
    return {
      users: []
    };
  },
  created() {
    axios.get('/reports/users')
      .then(({ data }) => {
        this.users = data;
      });
  },
  methods: {
    selected(it) {
      this.$router.push(`/reports/${it}`);
    }
  }
};
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
}
</style>
