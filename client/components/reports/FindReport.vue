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
import { sortBy } from 'lodash';

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
        this.users = sortBy(data, [user => user.lastName.toLowerCase()]);
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
