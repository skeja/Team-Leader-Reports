<template>
  <div class="container container-top">
    <div class="center">
      <div class="filter-input">
        <search-input :users="users" @search="setUsers($event)"></search-input>
      </div>
      <table class="table">
        <tr>
          <th @click="sort('lastName')">Name</th>
          <th @click="sort('email')">Email</th>
          <th @click="sort('office')">Office</th>
        </tr>
        <tr
          v-for="user in filteredUsers"
          :key="user.id"
          @click="viewUser(user)">
          <td>{{ user | fullName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.office }}</td>
        </tr>
      </table>
    </div>
    <span class="material-icons md-60 alt-color add" @click="addUser">add</span>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import fullName from '../../filters/fullName';
import { sortBy } from 'lodash';
import SearchInput from '../common/SearchInput';

export default {
  filters: {
    fullName
  },
  components: {
    SearchInput
  },
  data() {
    return {
      users: [],
      filteredUsers: []
    };
  },
  created() {
    axios.get('/users')
      .then(({ data }) => {
        this.users = sortBy(data, [user => user.lastName.toLowerCase()]);
        this.filteredUsers = this.users;
      });
  },
  methods: {
    setUsers(users) {
      this.filteredUsers = users;
    },
    viewUser(user) {
      this.$router.push({ name: 'user', params: { userId: user.id } });
    },
    addUser() {
      this.$router.push({ name: 'newUser' });
    },
    sort(it) {
      this.filteredUsers = sortBy(this.filteredUsers, [
        user => user[it].toLowerCase()
      ]);
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-input {
  margin-bottom: 2rem;
}

.find-user {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  & div {
    padding: 0 1rem;
  }
}

div.lastName {
  padding-left: 1vw;
}

td {
  cursor: pointer;
}
th {
  cursor: pointer;
}
.container {
  position: relative;
}
</style>
