<template>
  <div class="container container-top">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <i class="material-icons md-24 alt-color">keyboard_backspace</i>
        Back
      </div>
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
      this.$router.push(`/reports/new/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.name {
  border-radius: 0;
}
</style>
