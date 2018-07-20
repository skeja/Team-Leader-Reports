<template>
  <div class="container">
    <div class="center">
      <div class="find-user">
        <div>
          <label>Name:</label>
          <input
            v-model="user.firstName"
            type="text"
            @input="submit">
        </div>
        <div>
          <label>Last name:</label>
          <input
            v-model="user.lastName"
            type="text"
            @input="submit">
        </div>
      </div>
      <br>
      <table class="table">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
        <tr
          v-for="item in foundUsers"
          :key="item.id"
          @click="selected(item)">
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';
import debounce from 'lodash/debounce';

export default {
  data() {
    return {
      user: { firstName: '', lastName: '' },
      foundUsers: []
    };
  },
  methods: {
    submit: debounce(function () {
      axios.post('/users', this.user)
        .then(response => {
          if (typeof response.data === 'string') {
          } else {
            this.foundUsers = response.data;
          }
        });
    }, 500),
    selected(it) {
      this.$router.push(`/users/${it.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
