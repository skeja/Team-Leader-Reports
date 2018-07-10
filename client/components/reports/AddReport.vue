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
        this.users = data;
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
