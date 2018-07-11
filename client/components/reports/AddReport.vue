<template>
  <div class="container">
    <div class="center">
      <div class="name">
        Add Reports
      </div>
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
    axios.get('/reports/team/users')
      .then(({ data }) => {
        this.users = sortBy(data, [user => user.lastName.toLowerCase()]);
      });
  },
  methods: {
    selected(id) {
      this.$router.push(`/reports/${id}/newReport`);
    }
  }
};
</script>

<style lang="scss" scoped>
.name {
  border-radius: 0;
}
</style>
