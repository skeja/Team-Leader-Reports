<template>
  <div class="container">
    <div class="center">
      <select v-model="selected" >
        <option
          value=""
          selected
          hidden>
          Select user
        </option>
        <option
          v-for="user in users"
          :key="user.id"
          :value="user">
          {{ `${user.firstName} ${user.lastName}` }}
        </option>
      </select>
      <div v-if="selected">
        <user-form :updated-user="selected" @submitUser="submit($event)" ></user-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import sortBy from 'lodash/sortBy';
import UserForm from './UserForm.vue';

export default {
  components: {
    UserForm
  },
  data() {
    return {
      users: [],
      selected: ''
    };
  },
  created() {
    axios.get('/users')
      .then(response => {
        this.users = response.data;
        this.users = sortBy(this.users, ['lastName']);
      });
  },
  methods: {
    submit(user) {
      axios.put(`/users/${this.selected.id}`, user)
        .then(response => this.$router.push('/users'));
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  margin-top: 10px;
}
</style>
