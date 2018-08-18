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
      <user-list :users="filteredUsers" @selected="selected($event)"></user-list>
    </div>
    <i class="material-icons md-60 alt-color add" @click="addReport">
      add
    </i>
  </div>
</template>

<script>
import UserList from './UserList.vue';
import axios from '../../axios-auth';
import { debounce, filter, sortBy } from 'lodash';

export default {
  components: {
    UserList
  },
  data() {
    return {
      users: [],
      filteredUsers: [],
      input: ''
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
    selected(it) {
      this.$router.push({ name: 'userReports', params: { userId: it } });
    },
    submit: debounce(function (input) {
      const query = input.toLowerCase();
      this.filteredUsers = filter(this.users, ({ firstName = '', lastName = '' }) => {
        return firstName.toLowerCase().includes(query) ||
        lastName.toLowerCase().includes(query);
      });
    }, 500),
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
