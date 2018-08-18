<template>
  <div class="container container-top">
    <div class="center">
      <div class="filter-input">
        <input
          v-model="input"
          type="text"
          class="form__input"
          placeholder="search..."
          @input="submit(input)">
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
          @click="selected(user)">
          <td>{{ user | fullName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.office }}</td>
        </tr>
      </table>
    </div>
    <i class="material-icons md-60 alt-color add" @click="addUser">add</i>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import fullName from '../../filters/fullName';
import { debounce, filter, sortBy } from 'lodash';

export default {
  filters: {
    fullName
  },
  data() {
    return {
      user: { firstName: '', lastName: '' },
      users: [],
      filteredUsers: [],
      input: ''
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
    submit: debounce(function (input) {
      const query = input.toLowerCase();
      this.filteredUsers = filter(this.users, ({ firstName = '', lastName = '' }) => {
        return firstName.toLowerCase().includes(query) ||
        lastName.toLowerCase().includes(query);
      });
    }, 500),
    selected(it) {
      this.$router.push(`/users/${it.id}`);
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
