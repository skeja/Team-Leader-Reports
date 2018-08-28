<template>
  <div class="container container-top">
    <div class="center">
      <div class="filter-input">
        <search-input :users="users" @search="setUsers($event)"></search-input>
      </div>
      <user-list :users="filteredUsers" @selected="viewUserReports($event)"></user-list>
    </div>
    <span class="material-icons md-60 alt-color add" @click="addReport">
      add
    </span>
  </div>
</template>

<script>
import UserList from './UserList.vue';
import SearchInput from '../common/SearchInput';
import axios from '../../axios-auth';
import { sortBy } from 'lodash-es';

export default {
  components: {
    UserList,
    SearchInput
  },
  data() {
    return {
      users: [],
      filteredUsers: []
    };
  },
  created() {
    axios.get('/reports/users')
      .then(({ data }) => {
        this.users = sortBy(data, [user => user.lastName.toLowerCase()]);
        this.filteredUsers = this.users;
      });
  },
  methods: {
    setUsers(users) {
      this.filteredUsers = users;
    },
    viewUserReports(userId) {
      this.$router.push({ name: 'userReports', params: { userId } });
    },
    addReport() {
      this.$router.push({ name: 'addReport' });
    }
  }
};
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
}
</style>
