<template>
  <div class="container container-top">
    <div class="center">
      <div class="back-icon" @click="$router.back()">
        <span class="material-icons md-24 alt-color">keyboard_backspace</span>
        Back
      </div>
      <div class="name">
        Add Reports
      </div>
      <users :users="users" @selected="addUserReport($event)"></users>
    </div>
  </div>
</template>

<script>
import Users from './Users';
import axios from '../../axios-auth';
import { sortBy } from 'lodash-es';

export default {
  components: {
    Users
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
    addUserReport(userId) {
      this.$router.push({ name: 'newReport', params: { userId } });
    }
  }
};
</script>

<style lang="scss" scoped>
.name {
  border-radius: 0;
}
</style>
